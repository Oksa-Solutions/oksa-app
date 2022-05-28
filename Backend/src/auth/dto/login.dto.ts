import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsPhoneNumber, IsString} from 'class-validator';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

import {Login} from 'src/model/login.entity';

export class loginDto implements Readonly<loginDto> {
  @ApiProperty({required: false})
  @IsString()
  otp?: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  phoneNumber?: string;

  @ApiProperty({required: false})
  @IsEmail()
  email?: string;

  private static from(dto: Login): Partial<Login> {
    const loginObj = Object.assign(new Login(), {
      uuid: dto.uuid,
    });
    return loginObj;
  }

  public static fromEntity(dto: Login): Partial<Login> {
    return this.from(dto);
  }

  public static async toEntity(dto: loginDto): Promise<Login> {
    const hashedOTP: string = await bcrypt.hash(dto.otp, 12);
    const newLogin = new Login();
    newLogin.uuid = uuidv4();
    newLogin.loginCode = hashedOTP;
    newLogin.codeUsed = false;
    newLogin.createdAt = new Date();
    return newLogin;
  }
}
