import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs();

    if (!request['args'][0].handshake.headers.authorization) throw new UnauthorizedException('No auth provided');
    
    const token = request['args'][0].handshake.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET });
      
      request['args'][0].handshake.auth = payload;
    } catch {
      throw new UnauthorizedException('Fake token');
    }

    return true;
  }
}