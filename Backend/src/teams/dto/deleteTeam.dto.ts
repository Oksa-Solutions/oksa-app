import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class deleteTeamDto implements Readonly<deleteTeamDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;
}
