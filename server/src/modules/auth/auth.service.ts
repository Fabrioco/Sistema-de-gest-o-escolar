import { PrismaClient, User } from "@prisma/client";
import { HttpError } from "../../errors/http-errors";
import { AuthRepository } from "./auth.repository";
import { LoginDTO } from "./dtos/login.dto";
import jwt from "jsonwebtoken";
import errorMessage from "../../errors/error-message";
import { PasswordHelper } from "../../utils/password-helper";

const prisma = new PrismaClient();

class AuthService {
  public async login(data: LoginDTO) {
    const user = await this.existUser(data.email);

    await this.verifyPassword(data.password, user.password);

    return {
      ...user,
      ...(await this.createToken(user)),
    };
  }

  public async forgotPassword(email: string) {
    const user = await this.existUser(email);
    return await this.createToken(user);
  }

  private async existUser(email:string) {
    const user = await AuthRepository.findByCredential(email);

    if (!user) {
      throw HttpError.unauthorized(errorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  private async verifyPassword(password: string, hash: string) {
    const isMatch = await PasswordHelper.comparePassword(password, hash);
    if (!isMatch) {
      throw HttpError.unauthorized(errorMessage.CREDENTIAL_INVALID);
    }
  }

  private async createToken(user: User) {
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

export default new AuthService();
