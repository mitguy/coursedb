import { Controller, Get, Param, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { updateDto, uploadDto } from './users.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get(
    @Req() req: Request,
  ): Promise<Users> {
    return this.usersService.get(req['auth'].sub);
  }

  @Get(':username')
  async read(
    @Param('username') username: string,
  ): Promise<Users> {
    return this.usersService.read(username);
  }

  @Post('update')
  async update(
    @Req() req: Request,
    @Body() updateDto: updateDto,
  ): Promise<Users> {
    return this.usersService.update(
      { id: req['auth'].sub },
      { bio: updateDto.bio },
    );
  }

  @Post('upload')
  @FormDataRequest()
  async upload(
    @Req() req: Request,
    @Body() uploadDto: uploadDto,
  ): Promise<Users> {
    return this.usersService.update(
      { id: req['auth'].sub },
      { profilepic: uploadDto.profilepic.buffer },
    );
  }
}