import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {Observable} from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest = async (request: Request): Promise<boolean> => {
    const apiKey = request?.headers['x-api-key'];
    if (apiKey) {
      try {
        return apiKey === process.env.API_KEY;
      } catch (err) {
        console.error(err);
      }
    }
    return false;
  };
}
