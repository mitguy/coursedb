import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Streams, Prisma } from '@prisma/client';

@Injectable()
export class StreamsService {
  constructor(private prisma: PrismaService) {}
    
  async read(
    username: string
  ): Promise<Streams | null> {
    return this.prisma.streams.findUnique({
      where: { username } 
    });
  }

  async live(): Promise<Streams[] | null> {
    return this.prisma.streams.findMany({
      where: { live: true }
    });
  }

  async update(
    where: Prisma.StreamsWhereUniqueInput,
    data: Prisma.StreamsUpdateInput,
  ): Promise<Streams> {
    return this.prisma.streams.update({
      where,
      data
    });
  }
}