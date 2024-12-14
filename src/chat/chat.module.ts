import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WsModule } from 'src/ws/ws.module';

@Module({
  imports: [PrismaModule, WsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
