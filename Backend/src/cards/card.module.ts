import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {TokensModule} from 'src/tokens/tokens.module';

import {Card} from 'src/model/card.entity';

import {CardController} from './card.controller';
import {CardService} from './card.service';
import {SharedModule} from 'src/utils/shared.module';
import {Meeting} from 'src/model/meeting.entity';

@Module({
  imports: [
    SharedModule,
    TokensModule,
    TypeOrmModule.forFeature([Card, Meeting]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [TypeOrmModule, CardService],
})
export class CardModule {}
