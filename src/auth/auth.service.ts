import { Injectable, UnauthorizedException, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { registerDto, loginDto, tokenDto } from './auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: registerDto
  ): Promise<tokenDto> {
    let auth;

    try {
      auth = await this.prisma.auth.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          Passwords: {
            create: {
              hash: await hash(registerDto.password, Number(process.env.SALT)),
            }
          },
          Users: {
            create: {
              username: registerDto.username
            }
          },
          Streams: {
            create: {
              username: registerDto.username
            }
          }
        }
      });
    } catch (error) {
      if (error.code = 'P2002') {
        throw new ConflictException(`User ${registerDto.username} already exists`);
      }

      throw new BadRequestException(); 
    }


    const token = await this.jwtService.signAsync({sub: auth.id, username: auth.username});

    return {
      id: auth.id,
      username: auth.username,
      token,
    } as tokenDto;
  }

  async login(
    loginDto: loginDto
  ): Promise<tokenDto> {
    const auth = await this.prisma.auth.findUnique({ where: {username: loginDto.username }})

    if (!auth) throw new NotFoundException(`User ${loginDto.username} not found`);

    const password = await this.prisma.passwords.findUnique({ where: { id: auth.id }});

    const isAuth = await compare(loginDto.password, password.hash);

    if (!isAuth) throw new UnauthorizedException(`Wrong password`);

    const token = await this.jwtService.signAsync({sub: auth.id, username: auth.username});

    // this.prisma.tokens.create({
    //   data: {
    //     id: auth.id,
    //     token,
    //   }
    // })

    return {
      id: auth.id,
      username: auth.username,
      token,
    } as tokenDto;
  }

  async email(
    where: Prisma.AuthWhereUniqueInput,
    data: Prisma.AuthUpdateInput,
  ): Promise<Auth> {
    return this.prisma.auth.update({
      where,
      data,
    });
  }
}