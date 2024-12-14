import { IsNumber } from 'class-validator';

export class followsDto {
  @IsNumber()
  to: number;
}