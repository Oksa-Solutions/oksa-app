import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {ProfileSettingsController} from './profileSettings.controller';
import {ProfileSettingsService} from './profileSettings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileSetting])],
  controllers: [ProfileSettingsController],
  providers: [ProfileSettingsService],
  exports: [ProfileSettingsService, TypeOrmModule],
})
export class ProfileSettingsModule {}
