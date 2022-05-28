import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {CategoryInterface} from 'src/cards/interfaces/card.interfaces';
import {Meeting} from 'src/model/meeting.entity';

export class DeleteCategoryDto implements Readonly<DeleteCategoryDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  categories: CategoryInterface[];

  @ApiProperty({required: false})
  @IsUUID()
  lastModifiedBy: string;

  private static from(meeting: Meeting): Partial<Meeting> {
    const updatedMeeting = new Meeting();
    updatedMeeting.uuid = meeting.uuid;
    updatedMeeting.categories = meeting.categories;
    return updatedMeeting;
  }

  public static fromEntity(meeting: Meeting): Partial<Meeting> {
    return this.from(meeting);
  }

  public static toEntity(meeting: DeleteCategoryDto): Meeting {
    const updatedMeeting = new Meeting();
    updatedMeeting.uuid = meeting.meeting.uuid;
    updatedMeeting.categories = meeting.categories;
    return updatedMeeting;
  }
}
