import { LoginDTO } from "./dtos/login.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  static async findByCredential(data: LoginDTO) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    return findUser;
  }
}
