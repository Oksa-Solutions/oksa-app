import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

export class deleteOrganisationDto implements Readonly<deleteOrganisationDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;
}
