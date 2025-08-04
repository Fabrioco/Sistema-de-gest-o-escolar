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

  static async updateResetToken(email:string, token:string, expires:Date) {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    })
  
  }


  static async findByResetToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });
  }

  static async updatePassword(email: string, password: string) {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  }
}
