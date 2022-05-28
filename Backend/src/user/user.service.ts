import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {v4 as uuidv4} from 'uuid';

import {User} from 'src/model/user.entity';

import {createUserDto} from './dto/createUser.dto';
import {readUserDto} from './dto/readUser.dto';
import {updateUserDto} from './dto/updateUser.dto';
import {deleteUserDto} from './dto/deleteUser.dto';
import {tokenDataDto} from 'src/auth/dto/tokenData.dto';
import {updateUserMeetingsDto} from './dto/updateUserMeetings.dto';
import {TokensService} from 'src/tokens/tokens.service';
import {Meeting} from 'src/model/meeting.entity';
import {Card} from 'src/model/card.entity';
import {Profile} from 'src/model/profile.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Team} from 'src/model/team.entity';

@Injectable()
export class UserService {
  private cs: ConfigService;
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  createUser = async (user: createUserDto): Promise<any> => {
    try {
      const uuid = uuidv4();
      Object.assign(user, {uuid});

      const tokenPayload: tokenDataDto = {
        meetings: [],
        uuid,
        organisations: [],
      };
      const authToken = this.jwt.sign(tokenPayload, {expiresIn: '15m'});
      const refreshToken = this.jwt.sign(tokenPayload, {expiresIn: '365d'});
      const newUser: User = createUserDto.toEntity(
        user,
        authToken,
        refreshToken,
      );

      const res = await this.usersRepository.save(newUser);
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Creating user failed',
      };
    }
  };

  readUser = async (user: readUserDto): Promise<any> => {
    try {
      let data: {
        uuid: string;
        cards: Partial<Card>[];
        profile: Profile;
        meetings: Meeting[];
        authToken: string;
        refreshToken: string;
        organisations: Partial<Organisation>[],
        teams: Partial<Team>[],
      };

      const dbUser = await this.usersRepository
        .createQueryBuilder('user')
        .select([
          'user.uuid',
          'user.authToken',
          'user.refreshToken',
          'profile.uuid',
          'profile.name',
          'profile.email',
          'settings',
          'subscription'
        ])
        .leftJoin('user.profile', 'profile')
        .leftJoin('profile.settings', 'settings')
        .leftJoin('profile.subscription', 'subscription')
        .where('user.uuid = :uuid', {uuid: user.uuid})
        .getOne();


      const res = await Promise.all([
        // All topics of user and all cards in topics
        this.usersRepository
          .createQueryBuilder('user')
          .select([
            'user.uuid',
            'topic.uuid',
            'topic.id',
            'topic.name',
            'topic.status',
            'topic.categories',
            'topic.lastModified',
            'aUsers.uuid',
            'team.uuid',
            'team.name',
            'card.uuid',
            'card.title',
            'card.categories',
            'card.content',
            'card.dates',
            'card.status',
            'card.taskStatus',
            'card.votes',
            'card.lastModified',
          ])
          .leftJoin('user.meetings', 'topic')
          .leftJoin('topic.authorizedUsers', 'aUsers')
          .leftJoin('topic.team', 'team')
          .leftJoin('topic.cards', 'card', 'deleted = :deleted', {deleted: false})
          .where('user.uuid = :uuid', {uuid: user.uuid})
          .getOne(),

        // All cards of user
        getRepository(Card)
          .createQueryBuilder('card')
          .select([
            'card.uuid',
            'card.title',
            'card.categories',
            'card.content',
            'card.dates',
            'card.status',
            'card.taskStatus',
            'card.votes',
            'card.lastModified',
            'topic.uuid',
            'topic.id',
          ])
          .innerJoin('card.meeting', 'topic')
          .where('card.deleted = :deleted', {deleted: false})
          .andWhere('card.createdBy = :uuid', {uuid: user.uuid})
          .getMany(),

        // All organisations of user
        getRepository(Profile)
          .createQueryBuilder('profile')
          .select([
            'profile.uuid',
            'organisation.uuid',
            'organisation.name',
            'organisation.contactPerson',
            'organisation.contactEmail',
            'organisation.lastModified',
            'team.uuid',
            'team.name',
            'team.lastModified',
            'admin.uuid',
            'admin.name',
            'admin.email',
            'user.uuid',
            'user.name',
            'user.email',
          ])
          .leftJoin('profile.organisations', 'organisation')
          .leftJoin('organisation.teams', 'team')
          .leftJoin('organisation.admins', 'admin')
          .leftJoin('organisation.users', 'user')
          .where('profile.uuid = :uuid', {uuid: dbUser.profile.uuid})
          .getOne(),

        // All teams of user
        getRepository(Profile)
          .createQueryBuilder('profile')
          .select([
            'profile.uuid',
            'team.uuid',
            'team.name',
            'topic.uuid',
            'topic.name',
            'topic.id',
            'topic.lastModified',
            'admin.uuid',
            'admin.name',
            'admin.email',
            'user.uuid',
            'user.name',
            'user.email',
            'organisation.uuid',
            'organisation.name',
          ])
          .leftJoin('profile.teams', 'team')
          .leftJoin('team.topics', 'topic')
          .leftJoin('team.admins', 'admin')
          .leftJoin('team.users', 'user')
          .leftJoin('team.organisation', 'organisation')
          .where('profile.uuid = :uuid', {uuid: dbUser.profile.uuid})
          .getOne(),
      ]);

      data = {
        uuid: dbUser.uuid,
        authToken: dbUser.authToken,
        refreshToken: dbUser.refreshToken,
        profile: dbUser.profile,
        meetings: res[0].meetings,
        cards: res[1],
        organisations: res[2].organisations,
        teams: res[3].teams,
      };

      if (data.authToken === '' || data.refreshToken === '') {
        const tokens = await this.tokenService.createTokens(user.uuid);
        if (tokens.ok) {
          const userRes = await this.updateUser({
            uuid: user.uuid,
            authToken: tokens.data.authToken,
            refreshToken: tokens.data.refreshToken,
            lastModifiedBy: user.uuid,
          });
          if (userRes.ok) {
            data.authToken = tokens.data.authToken;
            data.refreshToken = tokens.data.refreshToken;
          } else {
            return {ok: false, data: 'User not found'};
          }
        } else {
          return {ok: false, data: 'User not found'};
        }
      }
      return {
        ok: true,
        data: data,
      };
    } catch (err) {
      console.log(err);
    }
    return {ok: false, data: 'User not found'};
  };

  updateUser = async (user: updateUserDto): Promise<any> => {
    try {
      const userData = await this.usersRepository.findOne({uuid: user.uuid});
      const updateSet: Partial<User> = updateUserDto.toEntity(user, userData);
      const res = await this.usersRepository.save(updateSet);
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Updating user failed',
      };
    }
  };

  updateUserMeetings = async (user: updateUserMeetingsDto): Promise<any> => {
    try {
      const dbUser = await this.readUser({uuid: user.uuid});
      if (dbUser.ok) {
        const res = await this.usersRepository.save(
          await updateUserMeetingsDto.toEntity(
            dbUser.data,
            await this.getUsersMeetings(user),
          ),
        );
        return {
          ok: true,
          data: res,
        };
      } else {
        return {
          ok: false,
          data: "Updating user's meetings failed due not finding user",
        };
      }
    } catch (err) {
      return {
        ok: false,
        data: "Updating user's meetings failed",
      };
    }
  };

  deleteUser = async (user: deleteUserDto): Promise<any> => {
    try {
      const res = await this.usersRepository.delete({uuid: user.uuid});
      if (res.affected > 0) {
        return {
          ok: true,
          data: `Deleted user with UUID ${user.uuid}`,
        };
      } else {
        return {
          ok: true,
          data: `No user with UUID ${user.uuid}`,
        };
      }
    } catch (err) {
      return {
        ok: false,
        data: 'Deleting user failed',
      };
    }
  };

  private getUsersMeetings = async (
    user: updateUserMeetingsDto,
  ): Promise<any> => {
    try {
      const meetings =
        (
          await this.usersRepository.findOne(
            {uuid: user.uuid},
            {relations: ['meetings']},
          )
        )?.meetings || new Array<Meeting>();
      const validKeys = ['uuid', 'id'];
      meetings.forEach((meeting: Meeting) => {
        Object.keys(meeting).forEach(
          (key: string) => validKeys.includes(key) || delete meeting[key],
        );
      });
      const newMeetings =
        meetings?.filter((m: Meeting) => m.uuid !== user.meeting.uuid) ||
        new Array<Meeting>();
      if (user.add) {
        newMeetings.push(user.meeting);
      }
      return newMeetings;
    } catch (err) {
      throw new Error(err);
    }
  };
}
