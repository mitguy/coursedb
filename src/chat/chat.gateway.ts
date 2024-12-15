import { Injectable, ValidationPipe, UsePipes, UseFilters, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
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
// @UseGuards(WsGuard)
@UseFilters(WsFilter)
// @UsePipes(new ValidationPipe())
@WebSocketGateway(80, { namespace: 'chat', transports: ['websocket', 'polling'], cors: { origin: '*' }})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer() server: Server;
  
  async handleConnection(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(client.handshake.headers);

    // switch (true) {
    //   case (!client.handshake.headers.chat):
    //   case (!client.handshake.headers.authorization):
    //   case (!client.handshake.headers.authorization.split(' ')[1]):
    //     client.disconnect();
    //   break;
    //   default: break;
    // }

    // try {
    //   await this.jwtService.verifyAsync(client.handshake.headers.authorization.split(' ')[1]);

    //   client.join(client.handshake.headers.chat);
    // } catch {
    //   client.disconnect();
    // }
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    // console.log(client);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() object: object,
    // @MessageBody() messageDto: messageDto,
  ): Promise<void> {
    // this.server.to(client.handshake.headers.chat).emit('message', JSON.stringify({
    //   id: client.handshake.auth.sub,
    //   username: client.handshake.auth.username,
    //   ...messageDto
    // }));

    this.server.emit('message', JSON.stringify(object));

    // client.broadcast.emit('message', JSON.stringify(messageDto));
    // ^^^ this broadcasts to everyone except the one who ???sent the message
  }
}