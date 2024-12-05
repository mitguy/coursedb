import { IsNumber, MaxLength } from 'class-validator';

export class followsDto {
  @IsNumber()
  to: number;
}