import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {Team} from 'src/model/team.entity';

export class addTeamMembersDto implements Readonly<addTeamMembersDto> {
  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  users: Partial<Profile>[];

  @ApiProperty({required: true})
  organisation: Organisation;

  private static from(dto: Team): Partial<Team> {
    const updatedTeam = new Team();
    updatedTeam.uuid = dto.uuid;
    updatedTeam.name = dto.name;
    updatedTeam.admins = dto.admins;
    updatedTeam.users = dto.users;
    updatedTeam.topics = dto.topics;
    updatedTeam.archived = dto.archived;
    return updatedTeam;
  }

  public static fromEntity(dto: Team): Partial<Team> {
    return this.from(dto);
  }

  public static toEntity(dto: addTeamMembersDto): Team {
    const team = new Team();
    return team;
  }
}
