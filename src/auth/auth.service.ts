
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

  async signIn(username: string, password: string): Promise<any> {
    const
      auth = await this.UsersService.findUnique({ username }),
      pass = await this.Password.


    return result;
  }
}
