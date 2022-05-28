import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';

export class readMeetingDto implements Readonly<readMeetingDto> {
  @ApiProperty({required: true})
  @IsString()
  meetingUUID: string;

  private static from(meeting: Meeting): Partial<Meeting> {
    const meetingObj = Object.assign(new Meeting(), {
      uuid: meeting.uuid,
      id: meeting.id,
      status: meeting.status,
      name: meeting.name,
      categories: meeting.categories,
      authorizedUsers: meeting.authorizedUsers,
      teamUuid: meeting?.team?.uuid,
      cards:
        meeting?.cards
          ?.filter((c: Card) => !c.deleted)
          ?.map((c: Card) => readCardDto.fromEntity({...c, meeting})) ||
        undefined,
    });
    return meetingObj;
  }

  public static fromEntity(meeting: Meeting): Partial<Meeting> {
    return this.from(meeting);
  }
}
