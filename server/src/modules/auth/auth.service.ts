import { PrismaClient, User } from "@prisma/client";
import { HttpError } from "../../errors/http-errors";
import { AuthRepository } from "./auth.repository";
import { LoginDTO } from "./dtos/login.dto";
import jwt from "jsonwebtoken";
import errorMessage from "../../errors/error-message";
import { PasswordHelper } from "../../utils/password-helper";
import crypto from "crypto";
import { transporterMail } from "../../libs/transporter";

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

    const token = crypto.randomInt(100000, 1000000).toString();
    const expires = new Date(Date.now() + 1000 * 60 * 15);

    await AuthRepository.updateResetToken(user.email, token, expires);

    await this.sendTokenToEmail(email, token);
  }

  public async resetPassword(token: string, password: string) {
    const user = await AuthRepository.findByResetToken(token);

    if (!user?.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw HttpError.unauthorized(errorMessage.TOKEN_EXPIRED);
    }

    const hashedPassword = await PasswordHelper.hashPassword(password);
    await AuthRepository.updatePassword(user.email, hashedPassword);
  }

  private async sendTokenToEmail(email: string, token: string) {
    try {
      const info = await transporterMail.sendMail({
        from: "Escola Api",
        to: email,
        subject: "Recuperação de senha",
        html: `<b>Token: ${token}</b>`,
      });

      console.log("token enviado", token);
    } catch (error) {
      console.log(error);
    }
  }

  private async existUser(email: string) {
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
