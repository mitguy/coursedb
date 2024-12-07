import { WsResponse, SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server = new Server();

  handleConnection(
    @ConnectedSocket() client: WebSocket
  ): void {
    console.log(typeof client);
  }

  handleDisconnect(
    @ConnectedSocket() client: WebSocket
  ): void {
    console.log(typeof client);
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: any): void {
    console.log(payload);
  }
}
