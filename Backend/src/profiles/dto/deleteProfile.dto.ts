import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {User} from 'src/model/user.entity';

export class deleteProfileDto implements Readonly<deleteProfileDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  user: User;
}
