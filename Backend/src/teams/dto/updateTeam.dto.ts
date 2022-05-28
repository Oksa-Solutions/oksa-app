import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsArray, IsUUID, IsBoolean} from 'class-validator';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';

import {Meeting} from 'src/model/meeting.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {Team} from 'src/model/team.entity';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';

export class updateTeamDto implements Readonly<updateTeamDto> {
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
  @IsArray()
  admins?: Profile[];

  @ApiProperty({required: false})
  @IsArray()
  users?: Profile[];

  @ApiProperty({required: false})
  topics?: Meeting[];

  @ApiProperty({required: false})
  @IsBoolean()
  archived?: boolean;

  private static from(dto: Team): Partial<Team> {
    const updatedTeam = new Team();
    updatedTeam.uuid = dto.uuid;
    updatedTeam.name = dto.name;
    updatedTeam.admins =
      (dto?.admins?.map((a: Profile) =>
        readProfileDto.fromEntity(a),
      ) as Profile[]) || [];
    updatedTeam.users =
      (dto?.users?.map((u: Profile) =>
        readProfileDto.fromEntity(u),
      ) as Profile[]) || [];
    updatedTeam.topics =
      (dto?.topics?.map((t: Meeting) =>
        readMeetingDto.fromEntity(t),
      ) as Meeting[]) || [];
    updatedTeam.organisation = {uuid: dto?.organisation?.uuid} as Organisation;
    updatedTeam.archived = dto.archived;
    return updatedTeam;
  }

  public static fromEntity(dto: Team): Partial<Team> {
    return this.from(dto);
  }

  public static toEntity(dto: updateTeamDto, orgTeam: Team): Team {
    const updatedTeam = new Team();
    updatedTeam.uuid = dto.uuid;
    updatedTeam.lastModifiedBy = dto.lastModifiedBy;
    updatedTeam.name = dto?.name || orgTeam.name;
    updatedTeam.topics = dto?.topics || orgTeam?.topics || [];
    updatedTeam.admins = dto?.admins || orgTeam?.admins || [];
    updatedTeam.users = dto?.users || orgTeam?.users || [];
    updatedTeam.archived = dto?.archived || orgTeam.archived;
    return updatedTeam;
  }
}
