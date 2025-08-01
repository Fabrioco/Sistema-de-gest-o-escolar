import bcrypt from "bcrypt";

export class PasswordHelper {
  static async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
