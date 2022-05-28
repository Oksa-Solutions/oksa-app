import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsPhoneNumber, IsString, IsUUID} from 'class-validator';

export class loginCodeDto implements Readonly<loginCodeDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsString()
  loginCode: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  phoneNumber?: string;

  @ApiProperty({required: false})
  @IsEmail()
  email?: string;
}
