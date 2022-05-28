import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {getRepository} from 'typeorm';
import {Request} from 'express';

import {AuthService} from './auth.service';

import {meetingAuthDto} from './dto/authenticateMeeting.dto';
import {loginDto} from './dto/login.dto';
import {loginCodeDto} from './dto/loginCode.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';

import {Public} from 'src/utils/publicDecorator.util';
import {TokensService} from 'src/tokens/tokens.service';
import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {Profile} from 'src/model/profile.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() post: loginDto): Promise<any> {
    if (post?.email || post?.phoneNumber) {
      try {
        // Check if user is premium user
        if (post?.phoneNumber) {
          const profile: Profile = await getRepository(Profile).findOne(
            {phoneNumber: post.phoneNumber},
            {relations: ['subscription', 'settings']},
          );
          if (profile?.subscription?.subscription !== 'Premium') {
            throw new HttpException(
              'No premium subscription',
              HttpStatus.NOT_FOUND,
            );
          }
        }
        const login = await this.authService.login(post);
        return login.data;
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Faced error during login',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('logincode')
  async loginCode(@Body() post: loginCodeDto): Promise<any> {
    if (post?.loginCode && post?.uuid && (post?.email || post?.phoneNumber)) {
      try {
        const login = await this.authService.loginCode(post);
        return login.data;
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Faced error during authentication',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  // Authenticate to topic
  @Post('meeting')
  // @authMeeting()
  async meetAuthentication(
    @Body() post: meetingAuthDto,
    @Req() req: Request,
  ): Promise<any> {
    // Check if user is in authorized users
    const uuid = this.tokenService.getUuidFromToken(req);
    const meetings = await getRepository(Meeting)
      .createQueryBuilder()
      .relation(User, 'meetings')
      .of(uuid)
      .loadMany();
    const userAuthorized = meetings
      .map((m: Meeting) => m.id)
      .includes(post.meeting.id);
    if (userAuthorized && post?.meeting?.id) {
      const meetingData = meetings.find(
        (m: Meeting) => m.id === post.meeting.id,
      );
      const user = await getRepository(User).findOne({uuid});
      return {
        tokens: {
          authToken: user.authToken,
          refreshToken: user.refreshToken,
        },
        meeting: readMeetingDto.fromEntity(meetingData),
      };
    } else if (post?.meeting?.id && post?.password && post?.uuid) {
      try {
        const lastModifiedBy = uuid;
        const authResponse = await this.authService.authorizeMeeting({
          ...post,
          lastModifiedBy,
        });
        return authResponse.data;
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Faced error during authentication',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post('refreshToken')
  async refreshToken(@Req() req: Request): Promise<any> {
    try {
      const newKeys = await this.authService.refreshToken(
        this.tokenService.getUuidFromToken(req),
      );
      return newKeys.data;
    } catch (err) {
      console.error(err);
      throw new HttpException('Token refresh failed', HttpStatus.NOT_FOUND);
    }
  }
}
