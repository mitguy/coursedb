import { Users, Auth, Prisma } from '@prisma/client';

export class createBody {
  username: string;
  password: string;
  email: string;
}

export class deleteBody {
  where: Prisma.AuthWhereUniqueInput;
}