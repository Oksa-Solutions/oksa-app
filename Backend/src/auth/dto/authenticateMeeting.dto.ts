import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';
import {Meeting} from 'src/model/meeting.entity';

export class meetingAuthDto implements Readonly<meetingAuthDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsString()
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsString()
  password: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;
}
