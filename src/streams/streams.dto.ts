import { MaxLength } from 'class-validator';

export class updateDto {
  @MaxLength(64)
  title: string;
}