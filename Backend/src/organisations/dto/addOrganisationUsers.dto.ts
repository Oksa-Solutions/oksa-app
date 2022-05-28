import {ApiProperty} from '@nestjs/swagger';
import {IsUUID, IsString, IsEmail} from 'class-validator';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';

export class addOrganisationUsersDto
  implements Readonly<addOrganisationUsersDto>
{
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: false})
  users: Partial<Profile>[];

  private static from(dto: Organisation): Partial<Organisation> {
    const updatedOrg = new Organisation();
    updatedOrg.uuid = dto.uuid;
    updatedOrg.name = dto?.name;
    updatedOrg.contactPerson = dto?.contactPerson;
    updatedOrg.contactEmail = dto?.contactEmail;
    updatedOrg.admins = dto?.admins;
    updatedOrg.users = dto?.users;
    return updatedOrg;
  }

  public static fromEntity(dto: Organisation): Partial<Organisation> {
    return this.from(dto);
  }

  public static toEntity(dto: addOrganisationUsersDto): Organisation {
    const updatedOrg = new Organisation();
    updatedOrg.uuid = dto.uuid;
    updatedOrg.lastModifiedBy = dto.lastModifiedBy;
    updatedOrg.users = dto?.users || undefined;
    return updatedOrg;
  }
}
