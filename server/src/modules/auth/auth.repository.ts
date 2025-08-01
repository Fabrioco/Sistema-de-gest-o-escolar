import { PasswordHelper } from "../../utils/password-helper";
import { LoginDTO } from "./dtos/login.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  static async loginAdmin(data: LoginDTO) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!findUser) {
      throw new Error("Credenciais inválidas");
    }

    const isValidPassword = await PasswordHelper.comparePassword(
      data.password,
      findUser.password
    );

    if (!isValidPassword) {
      throw new Error("Credenciais inválidas");
    }

    return findUser;
  }
}
