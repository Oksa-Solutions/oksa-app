import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest = async (req: Request): Promise<boolean> => {
    console.log(req);
    return true;
    return false;
  };
}
