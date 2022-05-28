import {ApiProperty} from '@nestjs/swagger';
import {IsUUID, IsString, IsEmail} from 'class-validator';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';

export class updateOrganisationDto implements Readonly<updateOrganisationDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: false})
  @IsString()
  name?: string;

  @ApiProperty({required: false})
  @IsString()
  contactPerson?: string;

  @ApiProperty({required: false})
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({required: false})
  admins?: Partial<Profile>[];

  @ApiProperty({required: false})
  users?: Partial<Profile>[];

  private static from(dto: Organisation): Partial<Organisation> {
    const updatedOrg = new Organisation();
    updatedOrg.uuid = dto.uuid;
    updatedOrg.name = dto?.name;
    updatedOrg.contactPerson = dto?.contactPerson;
    updatedOrg.contactEmail = dto?.contactEmail;
    updatedOrg.admins = dto?.admins;
    updatedOrg.users = dto?.users;
    updatedOrg.teams = dto?.teams;
    updatedOrg.domain = dto?.domain;
    return updatedOrg;
  }

  public static fromEntity(dto: Organisation): Partial<Organisation> {
    return this.from(dto);
  }

  public static toEntity(dto: updateOrganisationDto): Organisation {
    const updatedOrg = new Organisation();
    updatedOrg.uuid = dto.uuid;
    updatedOrg.lastModifiedBy = dto.lastModifiedBy;
    updatedOrg.name = dto?.name || undefined;
    updatedOrg.contactPerson = dto?.contactPerson || undefined;
    updatedOrg.contactEmail = dto?.contactEmail || undefined;
    updatedOrg.admins = dto?.admins || undefined;
    updatedOrg.users = dto?.users || undefined;

    Object.keys(updatedOrg).forEach((key: string) => {
      if (updatedOrg[key] === undefined) {
        delete updatedOrg[key];
      }
    });
    return updatedOrg;
  }
}
