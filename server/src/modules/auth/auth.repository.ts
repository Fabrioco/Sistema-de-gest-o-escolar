import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  static async findByCredential(email: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return findUser;
  }
}
