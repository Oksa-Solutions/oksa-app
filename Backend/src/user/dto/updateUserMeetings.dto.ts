import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsUUID} from 'class-validator';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';

export class updateUserMeetingsDto implements Readonly<updateUserMeetingsDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsBoolean()
  add: boolean;

  @ApiProperty({required: true})
  meeting: Meeting;

  private static from(dto: User): Partial<User> {
    const user = Object.assign(new User(), {
      uuid: dto.uuid,
      cards:
        dto?.cards
          ?.filter((c: Card) => !c.deleted)
          .map((c: Card) => readCardDto.fromEntity(c)) || undefined,
      meetings:
        dto?.meetings?.map((m: Meeting) => readMeetingDto.fromEntity(m)) ||
        undefined,
      authToken: dto.authToken,
      refreshToken: dto.refreshToken,
      profile: dto?.profile || undefined,
    });
    return user;
  }

  public static fromEntity(dto: User): Partial<User> {
    return this.from(dto);
  }

  public static async toEntity(
    dbUser: User,
    newMeetings: Meeting[],
  ): Promise<User> {
    const updatedUser = Object.assign(new User(), dbUser);
    updatedUser.meetings = newMeetings;
    updatedUser.lastModifiedBy = dbUser.uuid;
    return updatedUser;
  }
}
