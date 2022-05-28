import {ApiProperty} from '@nestjs/swagger';
import {IsPhoneNumber, IsString, IsEmail} from 'class-validator';

export class requestTrialDto implements Readonly<requestTrialDto> {
  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  @IsEmail()
  email: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  phoneNumber: string;
}
