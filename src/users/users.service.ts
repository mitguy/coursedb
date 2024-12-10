import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';

const sharp = require('sharp');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async get(
    id: number
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            FollowsTo: true
          }
        }
      }
    });
  }

  async read(
    username: string
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { username },
      include: {
        _count: {
          select: {
            FollowsTo: true
          }
        }
      }
    });
  }

  async update(
    where: Prisma.UsersWhereUniqueInput,
    data: Prisma.UsersUpdateInput,
  ): Promise<Users> {
    if (data.profilepic) {
      data.profilepic = await sharp(data.profilepic as Buffer).resize({width: Number(process.env.SIZE), height: Number(process.env.SIZE), fit: "contain"}).webp().toBuffer();
    }

    return this.prisma.users.update({
      where,
      data
    });
  }
}
