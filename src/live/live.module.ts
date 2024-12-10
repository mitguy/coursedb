import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LiveService],
})
export class LiveModule {}
