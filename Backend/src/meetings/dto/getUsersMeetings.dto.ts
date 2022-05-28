import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {Meeting} from 'src/model/meeting.entity';

export class getUsersMeetingsDto implements Readonly<getUsersMeetingsDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(meetings: Meeting[]): Partial<Meeting>[] {
    const newMeetings = meetings.map((meeting: Meeting) => {
      return Object.assign(new Meeting(), {
        uuid: meeting.uuid,
        name: meeting.name,
        id: meeting.id,
        status: meeting.status,
      });
    });
    return newMeetings;
  }

  public static fromEntity(meeting: Meeting[]): Partial<Meeting>[] {
    return this.from(meeting);
  }
}
