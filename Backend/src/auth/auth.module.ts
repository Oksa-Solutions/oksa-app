import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';

import {Login} from 'src/model/login.entity';
import {Meeting} from 'src/model/meeting.entity';

import {UserModule} from 'src/user/user.module';
import {ProfilesModule} from 'src/profiles/profiles.module';
import {TokensModule} from 'src/tokens/tokens.module';

import {JwtStrategy} from './jwt.strategy';
import {SharedModule} from 'src/utils/shared.module';

@Module({
  imports: [
    SharedModule,
    ProfilesModule,
    TokensModule,
    UserModule,
    TypeOrmModule.forFeature([Login, Meeting]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
