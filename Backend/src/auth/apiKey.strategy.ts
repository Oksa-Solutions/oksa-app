import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-jwt';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'apikey') {
  // constructor() {}
  async validate(req: Request): Promise<any> {
    const apikey = req.headers['x-api-key'];
    const auth = apikey === process.env.API_KEY;
    if (!auth) {
      throw new UnauthorizedException();
    }
    return auth;
  }
}
