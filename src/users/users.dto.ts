import { MaxLength } from 'class-validator';
import { IsFile, MaxFileSize, HasMimeType, MemoryStoredFile } from 'nestjs-form-data';

export class updateDto {
  @MaxLength(256)
  bio: string;
}

export class uploadDto {
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png', 'image/webp'])
  profilepic: MemoryStoredFile;
}