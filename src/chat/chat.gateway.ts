import { Injectable, ValidationPipe, UsePipes, UseFilters, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from 'src/prisma/prisma.service';
import { 
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsGuard } from 'src/ws/ws.guard';
import { WsFilter } from 'src/ws/ws.filter';
import { messageDto } from './chat.dto';

@Injectable()
@UseGuards(WsGuard)
@UseFilters(WsFilter)
@UsePipes(new ValidationPipe())
@WebSocketGateway(80, { namespace: 'chat', transports: ['websocket', 'polling'], cors: { origin: '*' }})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    // private prismaService: PrismaService,
  ) {}

  @WebSocketServer() server: Server;
  
  async handleConnection(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    switch (true) {
      case (!client.handshake.headers.chat):
      case (client.handshake.headers.chat == 'undefined'):
      case (!client.handshake.headers.authorization):
      case (!client.handshake.headers.authorization.split(' ')[1]):
        client.disconnect();
      break;
      default: break;
    }

    try {
      await this.jwtService.verifyAsync(client.handshake.headers.authorization.split(' ')[1]);

      client.join(client.handshake.headers.chat);
      
      // const viewers = (await this.server.in(client.handshake.headers.chat).fetchSockets()).length;

      // await this.prismaService.streams.update({
      //   where: {
      //     username: client.handshake.headers.chat as string,
      //   },
      //   data: {
      //     viewers,
      //   },
      // });
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    // const viewers = (await this.server.in(client.handshake.headers.chat).fetchSockets()).length;

    // await this.prismaService.streams.update({
    //   where: {
    //     username: client.handshake.headers.chat as string,
    //   },
    //   data: {
    //     viewers,
    //   },
    // });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageDto: messageDto,
  ): Promise<void> {
    this.server.to(client.handshake.headers.chat).emit('message', JSON.stringify({
      id: client.handshake.auth.sub,
      username: client.handshake.auth.username,
      at: new Date().toISOString(),
      ...messageDto
    }));

    // this.server.emit('message', JSON.stringify(object));

    // client.broadcast.emit('message', JSON.stringify(messageDto));
    // ^^^ this broadcasts to everyone except the one who ???sent the message
  }
}