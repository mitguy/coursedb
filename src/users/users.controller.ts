import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { Auth, Users, Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('user/create')
  async create(
    @Body() createUserBody,
  ): Promise<Auth> {
    return this.userService.create(createUserBody);
  }

  // @Get('user')
  // async read(): Promise<Auth> {
  //   return this.userService.create(createUserBody);
  // }

  @Post('user/delete')
  async delete(
    @Body() deleteUserBody,
  ): Promise<Auth> {
    return this.userService.delete(deleteUserBody);
  }
}
