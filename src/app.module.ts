import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { StreamsModule } from './streams/streams.module';
import { FollowsModule } from './follows/follows.module';
import { LiveModule } from './live/live.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UsersModule, StreamsModule, FollowsModule, LiveModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
