import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {TokensModule} from 'src/tokens/tokens.module';
import {UserService} from './user.service';
import {UserController} from './user.controller';

import {User} from 'src/model/user.entity';
import {SharedModule} from 'src/utils/shared.module';

@Module({
  imports: [SharedModule, TokensModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
