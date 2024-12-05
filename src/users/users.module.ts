import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, NestjsFormDataModule.config({ storage: MemoryStoredFile }), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
