export interface signInDto {
  phoneNumber?: string;
  email?: string;
}

export interface loginCodeDto {
  uuid: string;
  loginCode: string;
  phoneNumber?: string;
  email?: string;
}
