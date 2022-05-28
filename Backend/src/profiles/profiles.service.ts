import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Profile} from 'src/model/profile.entity';
import {createProfileDto} from './dto/createProfile.dto';
import {readProfileDto} from './dto/readProfile.dto';
import {updateProfileDto} from './dto/updateProfile.dto';
import {deleteProfileDto} from './dto/deleteProfile.dto';
import {ProfileSettingsService} from 'src/profileSettings/profileSettings.service';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {updateProfileSettingDto} from 'src/profileSettings/dto/updateProfileSetting.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(ProfileSettingsService)
    private readonly profileSettings: ProfileSettingsService,
  ) {}

  createProfile = async (profile: createProfileDto): Promise<any> => {
    try {
      const res = await this.profileRepository.save(
        createProfileDto.toEntity(profile),
      );
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      if (
        err.detail === `Key ("userUuid")=(${profile.user.uuid}) already exists.`
      ) {
        return {
          ok: false,
          data: 'Profile already exists',
        };
      }
    }
    return {
      ok: false,
      data: 'Creating profile failed',
    };
  };

  readProfile = async (profile: readProfileDto): Promise<any> => {
    try {
      const res = await this.profileRepository.findOne(
        {uuid: profile.uuid},
        {relations: ['user', 'settings', 'subscription', 'user.meetings']},
      );
      return {
        ok: true,
        data: res,
      };
    } catch (err) {}
    return {
      ok: false,
      data: 'Reading profile failed',
    };
  };

  updateProfile = async (profile: updateProfileDto): Promise<any> => {
    try {
      let updatedSettings: {ok: boolean; data: ProfileSetting};
      const orgProfile = await this.readProfile({uuid: profile.uuid});
      if (orgProfile.ok) {
        if (profile?.settings) {
          updatedSettings = await this.profileSettings.updateSetting({
            ...profile.settings,
            profile: {uuid: profile.uuid},
          });
        }
        const res = await this.profileRepository.save(
          updateProfileDto.toEntity(profile, orgProfile.data),
        );
        if (updatedSettings) {
          Object.assign(res, {
            data: {
              settings: updateProfileSettingDto.fromEntity(
                updatedSettings.data,
              ),
            },
          });
        }
        return {
          ok: true,
          data: res,
        };
      }
    } catch (err) {}
    return {
      ok: false,
      data: 'Updating profile failed',
    };
  };

  deleteProfile = async (profile: deleteProfileDto): Promise<any> => {
    try {
      const res = await this.profileRepository.delete({
        uuid: profile.uuid,
        user: profile.user,
      });
      if (res.affected > 0) {
        return {
          ok: true,
          data: `Deleted profile with UUID ${profile.uuid}`,
        };
      } else {
        return {
          ok: false,
          data: `No profile with UUID ${profile.uuid}`,
        };
      }
    } catch (err) {}
    return {
      ok: false,
      data: 'Deleting profile failed',
    };
  };
}
