import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {Meeting} from 'src/model/meeting.entity';

export class deleteMeetingDto implements Readonly<deleteMeetingDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;
}
