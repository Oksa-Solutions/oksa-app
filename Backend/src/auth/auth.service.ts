import {Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from 'typeorm';
import {SNS, SES} from 'aws-sdk';
import {PublishInput} from 'aws-sdk/clients/sns';
import {SendEmailRequest} from 'aws-sdk/clients/ses';
import * as bcrypt from 'bcrypt';

import {Login} from 'src/model/login.entity';
import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {Profile} from 'src/model/profile.entity';
import {ProfilesService} from 'src/profiles/profiles.service';

import {UserService} from 'src/user/user.service';

import {loginDto} from './dto/login.dto';
import {loginCodeDto} from './dto/loginCode.dto';
import {meetingAuthDto} from './dto/authenticateMeeting.dto';
import {updateUserDto} from 'src/user/dto/updateUser.dto';
import {readUserDto} from 'src/user/dto/readUser.dto';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';
import {TokensService} from 'src/tokens/tokens.service';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';

@Injectable()
export class AuthService {
  private cs: ConfigService;
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingsRepository: Repository<Meeting>,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ProfilesService) private readonly profileService: ProfilesService,
    @Inject(TokensService) private readonly tokenService: TokensService,
  ) {
    this.cs = new ConfigService();
  }

  login = async (post: loginDto): Promise<any> => {
    try {
      // Create OTP and save to database
      const otp = this.generateLoginCode();
      Object.assign(post, {otp});
      const saved = await this.saveLoginToDB(post);
      /* TODO: Make request to Cognito and save Cognito session to DB and respond to client */

      if (saved.ok) {
        if (process.env.STAGE !== 'local') {
          const res = await this.sendOTP(post);
          if (res.ok) {
            return saved;
          } else {
            return res;
          }
        } else {
          return saved;
        }
      }
      return {ok: false, data: 'Login failed'};
    } catch (err) {
      console.error(err);
      return {ok: false, data: 'Login failed'};
    }
  };

  loginCode = async (post: loginCodeDto): Promise<any> => {
    // Read Login from database
    const login = await this.loginRepository.findOne({uuid: post.uuid});
    if (
      !login.codeUsed &&
      login.createdAt.getTime() > new Date().getTime() - 5 * 60 * 1000
    ) {
      const codesMatch = await bcrypt.compare(post?.loginCode, login.loginCode);
      if (codesMatch) {
        this.loginRepository.update({uuid: post.uuid}, {codeUsed: true});

        // Check if user is already registered
        let profile: Profile;
        if (post?.email) {
          profile = await this.profileRepository.findOne(
            {email: post.email.toLowerCase()},
            {relations: ['subscription', 'settings']},
          );
        } else if (post?.phoneNumber) {
          profile = await this.profileRepository.findOne(
            {phoneNumber: post.phoneNumber},
            {relations: ['subscription', 'settings']},
          );
        }

        // Create a new user and a new profile if the user is not registered
        if (!profile) {
          const newUser = await this.userService.createUser({});
          const newProfile = await this.profileService.createProfile({
            user: newUser.data,
            name: 'default',
            email: post?.email.toLowerCase() || undefined,
            phoneNumber: post?.phoneNumber || undefined,
          });
          if (newProfile.ok) {
            profile = newProfile.data;
          } else {
            return {ok: false, data: 'New profile creation failed'};
          }
        }

        const user: User = await getRepository(User)
          .createQueryBuilder()
          .relation(Profile, 'user')
          .of(profile.uuid)
          .loadOne();
        // const user: User = (await this.profileService.readProfile({uuid: profile.uuid}))?.user || new User();
        const updatedTokens = await this.refreshToken(user.uuid);
        if (updatedTokens.ok) {
          user.authToken = updatedTokens.data.authToken;
          user.refreshToken = updatedTokens.data.refreshToken;
          return {
            ok: true,
            data: {
              profile: readProfileDto.fromEntity(profile),
              user: readUserDto.fromEntity(user),
            },
          };
        }
      }
    }
    return {ok: false, data: 'Login failed'};
  };

  authorizeMeeting = async (meeting: meetingAuthDto): Promise<any> => {
    let passwordsMatch: boolean;
    let meetingData: Meeting;
    try {
      meetingData = await this.meetingsRepository.findOneOrFail({
        id: meeting.meeting.id,
      });
      passwordsMatch = await bcrypt.compare(
        meeting?.password,
        meetingData.password,
      );
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        data: 'Reading meeting from DB failed',
      };
    }

    if (passwordsMatch) {
      try {
        const updatedUser = await this.userService.updateUserMeetings({
          uuid: meeting.uuid,
          meeting: meetingData,
          add: true,
        });
        if (updatedUser.ok) {
          const res = await this.tokenService.createTokens(
            updatedUser.data.uuid,
          );
          const updateUserSet: updateUserDto = {
            uuid: updatedUser.data.uuid,
            authToken: res.data.authToken,
            refreshToken: res.data.refreshToken,
            lastModifiedBy: meeting.lastModifiedBy,
          };
          const newUser = await this.userService.updateUser(updateUserSet);
          if (!newUser.ok) {
            return {
              ok: false,
              data: 'Token refresh failed',
            };
          }
          return {
            ok: res.ok,
            data: {
              tokens: res.data,
              meeting: readMeetingDto.fromEntity(meetingData),
            },
          };
        }
        return {
          ok: false,
          data: 'Updating token failed',
        };
      } catch (err) {
        console.error(err);
        return {
          ok: false,
          data: 'Unauthorized',
        };
      }
    } else {
      return {
        ok: false,
        data: 'Unauthorized',
      };
    }
  };

  refreshToken = async (uuid: string): Promise<any> => {
    try {
      const res = await this.tokenService.createTokens(uuid);
      const updateUserSet: updateUserDto = {
        uuid,
        authToken: res.data.authToken,
        refreshToken: res.data.refreshToken,
        lastModifiedBy: uuid,
      };
      const updatedUser = await this.userService.updateUser(updateUserSet);
      if (!updatedUser.ok) {
        return {
          ok: false,
          data: 'Token refresh failed',
        };
      }
      return res;
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        data: 'Token creation failed',
      };
    }
  };

  private generateLoginCode = (): string => {
    if (process.env.STAGE === 'local') {
      return '123456';
    }
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  private saveLoginToDB = async (dto: loginDto): Promise<any> => {
    try {
      const res = await this.loginRepository.save(await loginDto.toEntity(dto));
      return {ok: true, data: loginDto.fromEntity(res)};
    } catch (err) {
      console.error(err);
      return {ok: false, data: 'Saving OTP failed'};
    }
  };

  private sendOTP = async (post: loginDto): Promise<any> => {
    try {
      // Send OTP to user
      if (post?.phoneNumber) {
        const sns = new SNS();
        const params: PublishInput = {
          Message: `Oksa sign in code: ${post.otp}`,
          PhoneNumber: post.phoneNumber,
        };
        sns.publish(params, (err, data) => {
          if (err) console.error(err);
          else console.log(data);
        });
      } else if (post?.email) {
        const params: SendEmailRequest = {
          Source: 'no-reply@oksa.io',
          Destination: {
            ToAddresses: [post.email.toLowerCase()],
          },
          Message: {
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: `Oksa sign in code: ${post.otp}`,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: '[Oksa] Oksa sign in',
            },
          },
        };
        const ses = new SES();
        ses.sendEmail(params, (err: any, data: any) => {
          if (err) console.error(err);
          else console.log(data);
        });
      } else {
        return {ok: false, data: 'No email or phone number'};
      }
      return {ok: true, data: 'Code sent'};
    } catch (err) {
      console.error(err);
      return {ok: false, data: 'Sending code failed'};
    }
  };
}
