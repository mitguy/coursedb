import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    host.switchToWs().getClient().emit('error', JSON.stringify(exception instanceof WsException ? exception.getError() : exception.getResponse()));
  }
}