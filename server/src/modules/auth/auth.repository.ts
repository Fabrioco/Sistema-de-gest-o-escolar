import { PasswordHelper } from "../../utils/password-helper";
import { LoginDTO } from "./dtos/login.dto";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthRepository {
  static async login(data: LoginDTO) {
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

    const token = await this.createToken(findUser);

    const { password, createdAt, updatedAt, ...user } = findUser;

    return {
      ...token,
      ...user,
    };
  }

  static async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}
