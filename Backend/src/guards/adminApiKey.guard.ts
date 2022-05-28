import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {Observable} from 'rxjs';

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest = async (request: Request): Promise<boolean> => {
    const apiKey = request?.body?.apiKey;
    if (apiKey) {
      try {
        return apiKey === process.env.ADMIN_API_KEY;
      } catch (err) {
        console.error(err);
      }
    }
    return false;
  };
}
