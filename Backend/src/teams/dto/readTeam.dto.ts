import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {Profile} from 'src/model/profile.entity';

import {Team} from 'src/model/team.entity';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';

export class readTeamDto implements Readonly<readTeamDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(dto: Team) {
    const newTeam = Object.assign(new Team(), {
      uuid: dto.uuid,
      name: dto.name,
      organisation: {
        uuid: dto?.organisation?.uuid || '',
        name: dto?.organisation?.name || 'No organisation',
      },
      admins:
        dto?.admins?.map((a: Profile) => readProfileDto.fromEntity(a)) || [],
      users:
        dto?.users?.map((u: Profile) => readProfileDto.fromEntity(u)) || [],
      topics: dto?.topics || [],
      // Flatten array of arrays into one flat array containing all cards
      cards:
        [].concat.apply(
          [],
          dto?.topics?.map(
            (t: Meeting) =>
              t?.cards?.map((c: Card) => readCardDto.fromEntity(c)) || [],
          ),
        ) || [],
    });
    return newTeam;
  }

  public static fromEntity(dto: Team) {
    return this.from(dto);
  }
}
