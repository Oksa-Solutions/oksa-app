import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {Profile} from 'src/model/profile.entity';
import {ProfileSetting} from 'src/model/profileSettings.entity';

export class updateProfileSettingDto
  implements Readonly<updateProfileSettingDto>
{
  @ApiProperty({required: false})
  @IsUUID()
  uuid?: string;

  @ApiProperty({required: true})
  profile: Partial<Profile>;

  @ApiProperty({required: false})
  background?: {start: string; end: string};

  private static from(dto: ProfileSetting): Partial<ProfileSetting> {
    const setting = Object.assign(new ProfileSetting(), {
      profile: {
        uuid: dto.profile.uuid,
      },
      uuid: dto.uuid,
      background: dto.background,
    });
    return setting;
  }

  public static fromEntity(dto: ProfileSetting): Partial<ProfileSetting> {
    return this.from(dto);
  }

  public static toEntity(dto: updateProfileSettingDto): ProfileSetting {
    const setting = new ProfileSetting();
    setting.profile = Object.assign(new Profile(), dto.profile);
    setting.uuid = dto?.uuid || undefined;
    setting.background = dto?.background || undefined;
    return setting;
  }
}
