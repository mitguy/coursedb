import { IsAlphanumeric, IsStrongPassword, IsEmail, MinLength, MaxLength, IsJWT, IsNumber } from 'class-validator';

export class registerDto {
  @MinLength(4)
  @MaxLength(16)
  @IsAlphanumeric()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}

export class loginDto {
  @IsAlphanumeric()
  username: string;

  password: string;
}

export class tokenDto {
  @IsNumber()
  id: number
  
  @IsAlphanumeric()
  username: string;

  @IsJWT()
  token: string;
}

export class emailDto {
  @IsEmail()
  email: string;
}