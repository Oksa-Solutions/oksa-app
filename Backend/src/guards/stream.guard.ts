import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {Observable} from 'rxjs';

@Injectable()
export class StreamGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest = async (request: Request): Promise<boolean> => {
    const authToken = request?.query?.authToken;
    if (authToken) {
      try {
        const decoded = this.jwt.decode(authToken.toString());
        const meetingUUID = request?.query?.meetingUUID;
        return decoded['meetings'].includes(meetingUUID);
      } catch (err) {
        console.error(err);
      }
    }
    return false;
  };
}
