import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LiveGateway } from './live.gateway';

@Module({
  imports: [PrismaModule],
  providers: [LiveService, LiveGateway],
})
export class LiveModule {}
