import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {getRepository} from 'typeorm';
import {Request} from 'express';

import {tokenDataDto} from 'src/auth/dto/tokenData.dto';
import {Meeting} from 'src/model/meeting.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';
import {SUPER_ADMIN} from 'src/utils/constants.util';

@Injectable()
export class TokensService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  getUuidFromToken = (req: Request): string => {
    try {
      const authHeader = req?.headers?.authorization;
      const decoded = this.jwt.decode(authHeader.split(' ')[1]);
      const uuid = decoded['uuid'];
      return uuid;
    } catch (err) {}
    return '';
  };

  getTokenKeys = (): Record<string, string> => {
    return {
      authKey: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      refreshKey: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    };
  };

  createTokens = async (useruuid: string): Promise<any> => {
    // Get user information from DB
    const meetings = await getRepository(Meeting)
      .createQueryBuilder()
      .relation(User, 'meetings')
      .of(useruuid)
      .loadMany();

    const profileUuid: string = (
      await getRepository(Profile)
        .createQueryBuilder()
        .relation(User, 'profile')
        .of(useruuid)
        .loadOne()
    )?.uuid;

    let organisations: Organisation[];
    if (profileUuid) {
      const profile: Profile = await getRepository(Profile).findOne({
        relations: ['organisations', 'organisations.admins'],
        where: {uuid: profileUuid},
      });
      organisations = profile.organisations;
    } else {
      organisations = [];
    }

    const data: tokenDataDto = {
      uuid: useruuid,
      meetings: meetings.map((m: Meeting) => m.uuid),
      organisations: organisations.map((o: Organisation) => {
        return {
          uuid: o.uuid,
          name: o.name,
        };
      }),
    };

    try {
      const newAuthToken = this.jwt.sign(data, {
        expiresIn: '15m',
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      const newRefreshToken = this.jwt.sign(data, {
        expiresIn: '365d',
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      return {
        ok: true,
        data: {
          authToken: newAuthToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Token creation failed',
      };
    }
  };

  isSuperAdmin = (req: Request): boolean => {
    const authHeader = req?.headers?.authorization;
    const decoded = this.jwt.decode(authHeader.split(' ')[1]);
    return decoded['organisations']
      .map((o: Organisation) => o.name)
      .includes(SUPER_ADMIN);
  };
}
