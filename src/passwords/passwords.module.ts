import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';

@Module({
  imports: [PrismaModule],
  controllers: [PasswordsController],
  providers: [PasswordsService]
})
export class PasswordsModule {}
