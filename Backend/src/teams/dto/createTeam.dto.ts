import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsString, IsUUID} from 'class-validator';
import {v4 as uuidv4} from 'uuid';

import {Meeting} from 'src/model/meeting.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {Team} from 'src/model/team.entity';

export class createTeamDto implements Readonly<createTeamDto> {
  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  organisation: Organisation;

  @ApiProperty({required: true})
  @IsArray()
  admins: Profile[];

  @ApiProperty({required: false})
  @IsArray()
  users: Profile[];

  @ApiProperty({required: false})
  topics: Meeting[];

  private static from(dto: Team): Partial<Team> {
    const newTeam = Object.assign(new Team(), {
      uuid: dto.uuid,
      name: dto.name,
      organisation: {uuid: dto.organisation.uuid},
      admins: dto.admins,
      users: dto?.users || [],
      topics: dto?.topics || [],
    });
    return newTeam;
  }

  public static fromEntity(dto: Team): Partial<Team> {
    return this.from(dto);
  }

  public static toEntity(dto: createTeamDto): Team {
    const uuid = uuidv4();
    let users = dto?.users || [];
    const userUuids = users.map((u: Profile) => u.uuid);
    users = users.concat(
      ...dto.admins.filter((a: Profile) => !userUuids.includes(a.uuid)),
    );

    const team = Object.assign(new Team(), {
      uuid,
      name: dto.name,
      organisation: dto.organisation,
      admins: dto.admins,
      users,
      topics: dto?.topics || [],
      createdBy: dto.lastModifiedBy,
      lastModifiedBy: dto.lastModifiedBy,
      archived: false,
    });
    return team;
  }
}
