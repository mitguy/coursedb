import { Module } from '@nestjs/common';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [PrismaController],
  exports: [PrismaService]
})
export class PrismaModule {}
