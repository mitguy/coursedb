import { Req, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth, Passwords } from '@prisma/client';
import { AuthService } from './auth.service';
import { registerDto, loginDto, tokenDto, passwordDto, emailDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() registerDto: registerDto
  ): Promise<tokenDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body() loginDto: loginDto
  ): Promise<tokenDto>  {
    return this.authService.login(loginDto);
  }

  @Post('password')
  @UseGuards(AuthGuard)
  password(
    @Req() req: Request,
    @Body() passwordDto: passwordDto,
  ): Promise<Passwords>  {
    return this.authService.password(req['auth'].sub, passwordDto);
  }

  @Post('email')
  @UseGuards(AuthGuard)
  email(
    @Req() req: Request,
    @Body() emailDto: emailDto,
  ): Promise<Auth>  {
    return this.authService.email(
      { id: req['auth'].sub },
      { email: emailDto.email },
    );
  }
}
