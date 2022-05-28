import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {getRepository} from 'typeorm';
import {Request} from 'express';
import {Observable} from 'rxjs';

import {User} from 'src/model/user.entity';
import {Profile} from 'src/model/profile.entity';
import {Organisation} from 'src/model/organisation.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest = async (request: Request): Promise<boolean> => {
    const authHeader = request.headers?.authorization;
    if (authHeader) {
      try {
        const authToken = authHeader.split(' ')[1];
        const decoded = this.jwt.decode(authToken);
        const profile: Profile = await getRepository(Profile)
          .createQueryBuilder()
          .relation(User, 'profile')
          .of(decoded['uuid'])
          .loadOne();
        const adminOrganisations = await getRepository(Organisation)
          .createQueryBuilder()
          .relation(Profile, 'adminOrganisations')
          .of(profile.uuid)
          .loadMany();
        return (
          adminOrganisations.map((o: Organisation) =>
            decoded['organisations'].map(
              (org: Organisation) => o.uuid === org.uuid,
            ),
          ).length > 0
        );
      } catch (err) {
        console.error(err);
      }
    }
    return false;
  };
}
