import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { StreamsModule } from './streams/streams.module';
import { FollowsModule } from './follows/follows.module';
import { ChatModule } from './chat/chat.module';
import { LiveModule } from './live/live.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule, AuthModule, UsersModule, StreamsModule, FollowsModule, ChatModule, WsModule, //LiveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
