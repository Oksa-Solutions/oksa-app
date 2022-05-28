import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsIP, IsPhoneNumber, IsString, IsUUID} from 'class-validator';
import {Profile} from 'src/model/profile.entity';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {User} from 'src/model/user.entity';

export class updateProfileDto implements Readonly<updateProfileDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: true})
  user: User;

  @ApiProperty({required: false})
  @IsString()
  name?: string;

  @ApiProperty({required: false})
  @IsEmail()
  email?: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  phoneNumber?: string;

  @ApiProperty({required: false})
  @IsIP()
  ip?: string;

  @ApiProperty({required: false})
  settings?: ProfileSetting;

  private static from(dto: Profile): Partial<Profile> {
    const profile = Object.assign(new Profile(), {
      uuid: dto.uuid,
      name: dto.name,
      email: dto?.email || undefined,
      phoneNumber: dto?.phoneNumber || undefined,
      settings: dto?.settings || undefined,
    });
    return profile;
  }

  public static fromEntity(dto: Profile): Partial<Profile> {
    return this.from(dto);
  }

  public static toEntity(dto: updateProfileDto, orgProfile: Profile): Profile {
    const updatedProfile = new Profile();
    updatedProfile.uuid = dto.uuid;
    updatedProfile.user = dto.user;
    updatedProfile.lastModifiedBy = dto.lastModifiedBy;
    updatedProfile.name = dto?.name || orgProfile?.name || undefined;
    updatedProfile.email = dto?.email || orgProfile?.email || undefined;
    updatedProfile.phoneNumber =
      dto?.phoneNumber || orgProfile?.phoneNumber || undefined;

    if (dto?.ip) {
      const ips = orgProfile?.ip?.filter((ip: string) => ip !== dto.ip);
      ips.push(dto.ip);
      updatedProfile.ip = ips;
    }
    return updatedProfile;
  }
}
