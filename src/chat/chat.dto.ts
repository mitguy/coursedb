import { MinLength, MaxLength, IsString } from 'class-validator';

export class messageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  message: string;
}