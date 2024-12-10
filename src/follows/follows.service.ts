import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Follows, Prisma } from '@prisma/client';
import { followsDto } from './follows.dto';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}
    
  async read(
    from: number
  ): Promise<Follows[] | null> {
    return this.prisma.follows.findMany({
      where: { from } 
    });
  }

  async count(
    to: number
  ): Promise<number | null> {
    return this.prisma.follows.count({
      where: {
        to
      }
    });
  }

  async live(
    from: number
  ): Promise<Follows[] | null> {
    return this.prisma.follows.findMany({
      where: {
        ToStream: {
          live: true,
        },
      },
      include: {
        ToStream: true,
        ToUser: true,
      },
    });
  }

  async create(
    from: number,
    followsDto: followsDto,
  ): Promise<Follows> {
    return this.prisma.follows.create({
      data: {
        from,
        to: followsDto.to,
      }
    });
  }

  async delete(
    from: number,
    followsDto: followsDto,
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.follows.deleteMany({
      where: {
        from,
        to: followsDto.to,
      }
    });
  }
}
