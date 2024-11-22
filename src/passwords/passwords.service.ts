import { Injectable } from '@nestjs/common';
import { Passwords, Prisma } from '@prisma/client';

@Injectable()
export class PasswordsService {
  constructor(private prisma: PrismaService) {}

  async getPassword(PasswordsWhereUniqueInput: Prisma.PasswordsWhereUniqueInput): Promise<Passwords> {
    return this.prisma.passwords.findUnique({
      where: {
        id: PasswordsWhereUniqueInput.userID
      }
    });
  }
}