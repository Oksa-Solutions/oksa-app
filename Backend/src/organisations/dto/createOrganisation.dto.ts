import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsEmail} from 'class-validator';
import {v4 as uuidv4} from 'uuid';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';

export class createOrganisationDto implements Readonly<createOrganisationDto> {
  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  lastModifiedBy: string;

  @ApiProperty({required: false})
  @IsString()
  contactPerson: string;

  @ApiProperty({required: false})
  @IsEmail()
  contactEmail: string;

  @ApiProperty({required: false})
  users: Profile[];

  @ApiProperty({required: false})
  admins: Profile[];

  @ApiProperty({required: true})
  domain: string;

  private static from(dto: Organisation): Partial<Organisation> {
    const organisation = Object.assign(new Organisation(), {
      uuid: dto.uuid,
      name: dto.name,
      contactPerson: dto?.contactPerson || '',
      contactEmail: dto?.contactEmail || '',
      users: dto?.users || [],
      admins: dto?.admins || [],
      teams: dto?.teams || [],
      domain: dto.domain,
    });
    return organisation;
  }

  public static fromEntity(dto: Organisation): Partial<Organisation> {
    return this.from(dto);
  }

  public static toEntity(dto: createOrganisationDto): Organisation {
    let users = dto?.users || [];
    const userUuids = users.map((u: Profile) => u.uuid);
    users = users.concat(
      ...dto.admins.filter((a: Profile) => !userUuids.includes(a.uuid)),
    );

    const newOrg = new Organisation();
    newOrg.uuid = uuidv4();
    newOrg.createdBy = dto.lastModifiedBy;
    newOrg.lastModifiedBy = dto.lastModifiedBy;
    newOrg.name = dto.name;
    newOrg.contactPerson = dto.contactPerson;
    newOrg.contactEmail = dto.contactEmail;
    newOrg.users = users;
    newOrg.admins = dto.admins;
    newOrg.domain = dto.domain;
    return newOrg;
  }
}
