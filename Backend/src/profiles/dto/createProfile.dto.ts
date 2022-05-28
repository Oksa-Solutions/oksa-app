import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsIP, IsPhoneNumber, IsString} from 'class-validator';
import {v4 as uuidv4} from 'uuid';

import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';

export class createProfileDto implements Readonly<createProfileDto> {
  @ApiProperty({required: true})
  user: User;

  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: false})
  @IsEmail()
  email?: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  phoneNumber?: string;

  @ApiProperty({required: false})
  @IsIP()
  ip?: string;

  private static from(dto: Profile): Partial<Profile> {
    const newProfile = Object.assign(new Profile(), {
      uuid: dto.uuid,
      name: dto.name,
      email: dto?.email || undefined,
      phoneNumber: dto?.phoneNumber || undefined,
    });
    return newProfile;
  }

  public static fromEntity(dto: Profile): Partial<Profile> {
    return this.from(dto);
  }

  public static toEntity(dto: createProfileDto): Profile {
    const uuid = uuidv4();
    const newProfile = Object.assign(new Profile(), dto);
    newProfile.uuid = uuid;
    newProfile.createdBy = dto.user.uuid;
    newProfile.lastModifiedBy = dto.user.uuid;
    return newProfile;
  }
}
