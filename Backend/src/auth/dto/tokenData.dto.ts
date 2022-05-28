import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsUUID} from 'class-validator';

export class tokenDataDto implements Readonly<tokenDataDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: false})
  @IsArray()
  organisations?: {
    uuid: string;
    name: string;
  }[];

  @ApiProperty({required: false})
  @IsArray()
  meetings?: string[];
}
