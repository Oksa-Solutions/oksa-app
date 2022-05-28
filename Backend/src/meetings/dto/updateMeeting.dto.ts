import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {CategoryInterface} from 'src/cards/interfaces/card.interfaces';
import {Meeting} from 'src/model/meeting.entity';

export class updateMeetingDto {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  private static from(meeting: Meeting): Partial<Meeting> {
    const updatedMeeting = Object.assign(new Meeting(), {
      uuid: meeting.uuid,
      id: meeting.id,
      name: meeting.name,
      status: meeting.status,
      authorizedUsers: meeting.authorizedUsers,
      categories: meeting.categories,
    });
    return updatedMeeting;
  }

  public static fromEntity(meeting: Meeting): Partial<Meeting> {
    return this.from(meeting);
  }

  public static toEntity(
    meeting: updateMeetingDto,
    currentMeeting: Meeting,
  ): Meeting {
    const currentCategories: CategoryInterface[] =
      currentMeeting?.categories || [];
    const updateMeeting = new Meeting();
    updateMeeting.uuid = meeting?.meeting?.uuid;
    updateMeeting.id = meeting?.meeting?.id;
    updateMeeting.lastModifiedBy = meeting.lastModifiedBy;
    updateMeeting.name = meeting?.meeting?.name || undefined;
    updateMeeting.status = meeting?.meeting?.status || undefined;
    updateMeeting.categories =
      meeting?.meeting?.categories || currentCategories;
    updateMeeting.authorizedUsers =
      meeting?.meeting?.authorizedUsers ||
      currentMeeting?.authorizedUsers ||
      undefined;
    Object.keys(updateMeeting).forEach((key: string) => {
      if (updateMeeting[key] === undefined) {
        delete updateMeeting[key];
      }
    });
    return updateMeeting;
  }
}
