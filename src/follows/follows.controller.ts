import { Controller, Get, Param, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { Follows, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { FollowsService } from './follows.service';
import { followsDto } from './follows.dto';

@Controller('follows')
@UseGuards(AuthGuard)
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get()
  async get(
    @Req() req: Request,
  ): Promise<Follows[]> {
    return this.followsService.read(req['auth'].sub);
  }

  @Get(':to')
  async check(
    @Req() req: Request,
    @Param() followsDto: followsDto,
  ): Promise<Follows | null> {
    return this.followsService.check(req['auth'].sub, followsDto.to);
  }

  @Get('count/:id')
  async count(
    @Param() followsDto: followsDto,
  ): Promise<number> {
    return this.followsService.count(followsDto.to);
  }

  @Get('live')
  async live(
    @Req() req: Request,
  ): Promise<Follows[]> {
    return this.followsService.live(req['auth'].sub);
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() followsDto: followsDto,
  ): Promise<Follows> {
    return this.followsService.create(
      req['auth'].sub,
      followsDto,
    );
  }

  @Post('delete')
  async delete(
    @Req() req: Request,
    @Body() followsDto: followsDto,
  ): Promise<Prisma.BatchPayload> {
    return this.followsService.delete(
      req['auth'].sub,
      followsDto,
    );
  }
}