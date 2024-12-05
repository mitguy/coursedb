import { FastifyRequest } from "fastify";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as FastifyRequest;

    if (!request.headers.authorization) throw new UnauthorizedException('No auth provided');
    
    const token = request.headers.authorization.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET });

      request['auth'] = payload;
    } catch {
      throw new UnauthorizedException('Fake token');
    }

    return true;
  }
}