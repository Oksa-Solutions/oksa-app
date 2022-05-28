import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {Team} from 'src/model/team.entity';
import {readTeamDto} from 'src/teams/dto/readTeam.dto';

export class readOrganisationDto implements Readonly<readOrganisationDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(dto: Organisation): Partial<Organisation> {
    const org = new Organisation();
    org.uuid = dto.uuid;
    org.name = dto.name;
    org.contactPerson = dto.contactPerson;
    org.contactEmail = dto.contactEmail;
    org.users =
      dto?.users?.map((u: Profile) => {
        return {uuid: u.uuid};
      }) || [];
    org.admins =
      dto?.admins?.map((a: Profile) => {
        return {uuid: a.uuid};
      }) || [];
    org.teams = dto?.teams?.map((t: Team) => readTeamDto.fromEntity(t)) || [];
    org.domain = dto.domain;
    return org;
  }

  public static fromEntity(dto: Organisation): Partial<Organisation> {
    return this.from(dto);
  }
}
