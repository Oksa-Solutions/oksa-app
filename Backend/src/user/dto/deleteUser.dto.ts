import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class deleteUserDto implements Readonly<deleteUserDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;
}
