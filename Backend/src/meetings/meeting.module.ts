import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {MeetingController} from './meeting.controller';
import {MeetingService} from './meeting.service';

import {CardModule} from 'src/cards/card.module';
import {TokensModule} from 'src/tokens/tokens.module';
import {UserModule} from 'src/user/user.module';

import {Meeting} from 'src/model/meeting.entity';
import {SharedModule} from 'src/utils/shared.module';
import {User} from 'src/model/user.entity';
import {Team} from 'src/model/team.entity';

@Module({
  imports: [
    SharedModule,
    CardModule,
    UserModule,
    TokensModule,
    TypeOrmModule.forFeature([Meeting, User, Team]),
  ],
  controllers: [MeetingController],
  providers: [MeetingService],
  exports: [TypeOrmModule, MeetingService],
})
export class MeetingModule {}
