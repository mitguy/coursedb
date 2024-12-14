import {
  IsString,
  MinLength,
  MaxLength,
  IsAlphanumeric,
  IsStrongPassword,
  IsEmail,
  IsNumber,
  IsJWT
} from 'class-validator';

export class registerDto {
  @IsString()
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

  @IsStrongPassword()
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

export class passwordDto {
  @IsStrongPassword()
  old: string;

  @IsStrongPassword()
  new: string;
}

export class emailDto {
  @IsEmail()
  email: string;
}