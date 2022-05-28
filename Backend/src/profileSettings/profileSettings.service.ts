import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {Repository} from 'typeorm';
import {updateProfileSettingDto} from './dto/updateProfileSetting.dto';

@Injectable()
export class ProfileSettingsService {
  constructor(
    @InjectRepository(ProfileSetting)
    private readonly profileSettings: Repository<ProfileSetting>,
  ) {}

  // createSetting = async (): Promise<any> => {};

  // readSetting = async (): Promise<any> => {};

  updateSetting = async (setting: updateProfileSettingDto): Promise<any> => {
    try {
      const updatedSetting = await this.profileSettings.save(
        updateProfileSettingDto.toEntity(setting),
      );
      return {
        ok: true,
        data: updatedSetting,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Updating profile settings failed',
      };
    }
  };
}
