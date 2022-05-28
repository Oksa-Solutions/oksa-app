import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SharedModule} from 'src/utils/shared.module';
import {TokensController} from './tokens.controller';
import {TokensService} from './tokens.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([])],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TypeOrmModule, TokensService],
})
export class TokensModule {}
