import { Module } from '@nestjs/common';
import { WsFilter } from './ws.filter';
import { WsGuard } from './ws.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET })],
  providers: [WsFilter, WsGuard],
  exports: [WsFilter, WsGuard],
})
export class WsModule {}
