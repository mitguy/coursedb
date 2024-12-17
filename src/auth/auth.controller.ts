import { Req, Body, Controller, Post, UseGuards, Delete, Get } from '@nestjs/common';
import { Auth, Passwords } from '@prisma/client';
import { AuthService } from './auth.service';
import { registerDto, loginDto, tokenDto, passwordDto, emailDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: registerDto
  ): Promise<tokenDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: loginDto
  ): Promise<tokenDto> {
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async get(
    @Req() req: Request,
  ): Promise<Auth> {
    return this.authService.get(req['auth'].sub);
  }

  @Post('password')
  @UseGuards(AuthGuard)
  async password(
    @Req() req: Request,
    @Body() passwordDto: passwordDto,
  ): Promise<Passwords> {
    return this.authService.password(req['auth'].sub, passwordDto);
  }

  @Post('email')
  @UseGuards(AuthGuard)
  async email(
    @Req() req: Request,
    @Body() emailDto: emailDto,
  ): Promise<Auth> {
    return this.authService.email(
      { id: req['auth'].sub },
      { email: emailDto.email },
    );
  }

  @Delete()
  @UseGuards(AuthGuard)
  async delete(
    @Req() req: Request,
  ): Promise<Auth> {
    return this.authService.delete({
      id: req['auth'].sub,
      username: req['auth'].username,
    });
  }
}
