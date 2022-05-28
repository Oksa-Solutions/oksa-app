import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {TokensModule} from 'src/tokens/tokens.module';
import {ProfileSettingsModule} from 'src/profileSettings/profileSettings.module';

import {Profile} from 'src/model/profile.entity';

import {ProfilesController} from './profiles.controller';
import {ProfilesService} from './profiles.service';

@Module({
  imports: [
    ProfileSettingsModule,
    TokensModule,
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [TypeOrmModule, ProfilesService],
})
export class ProfilesModule {}
