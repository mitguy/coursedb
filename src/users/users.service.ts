import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { Users, Auth, Prisma } from '@prisma/client';
import { createBody, deleteBody } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createBody: createBody): Promise<Auth> {
    return this.prisma.auth.create({
      data: {
        username: createBody.username,
        email: createBody.email,
        Passwords: {
          create: {
            active: true,
            hash: await bcrypt.hash(createBody.password, Number(process.env.SALT)),
          }
        },
        Users: {
          create: {
            username: createBody.username
          }
        }
      }
    });
  }

  async read(
    UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
    });
  }

  async update(updateBody: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    return this.prisma.users.update({
      where: updateBody.where,
      data: updateBody.data
    });
  }

  async delete(deleteBody: deleteBody): Promise<Auth> {
    return this.prisma.auth.delete({
      where: deleteBody.where,
    });
  }

  // async delete(where: Prisma.AuthWhereUniqueInput): Promise<Auth> {
  //   return this.prisma.auth.delete({
  //     where,
  //   });
  // }
}
