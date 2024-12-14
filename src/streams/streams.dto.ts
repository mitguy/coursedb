import { IsString, MinLength, MaxLength } from 'class-validator';

export class updateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  title: string;
}