import { Controller, Get, Param, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { Streams } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { StreamsService } from './streams.service';
import { updateDto } from './streams.dto';
import { ChatGateway } from 'src/chat/chat.gateway';

@Controller('streams')
@UseGuards(AuthGuard)
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get()
  async get(
    @Req() req: Request,
  ): Promise<Streams> {
    return this.streamsService.read(req['auth'].username);
  }

  @Get('live')
  async live(): Promise<Streams[]> {
    return this.streamsService.live();
  }

  @Get(':username')
  async read(
    @Param('username') username: string
  ): Promise<Streams> {
    return this.streamsService.read(username);
  }
  
  @Post('update')
  async update(
    @Req() req: Request,
    @Body() updateDto: updateDto,
  ): Promise<Streams> {
    return this.streamsService.update(
      { id: req['auth'].sub },
      { title: updateDto.title },
    );
  }
}