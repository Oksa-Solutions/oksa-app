import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ApiSecurity} from '@nestjs/swagger';
import {Request} from 'express';
import {Observable} from 'rxjs';

import {JwtAuth} from 'src/utils/decorators.util';

@ApiSecurity('Token guard', ['Authentication: Bearer <token>'])
@JwtAuth()
@Injectable()
export class MeetingGuard implements CanActivate {
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
        const meetingUUID =
          request.body?.meeting?.uuid || request.query?.meetingUUID;
        return decoded['meetings'].includes(meetingUUID);
      } catch (err) {
        console.error(err);
      }
    }
    return false;
  };
}
