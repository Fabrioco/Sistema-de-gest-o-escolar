import { AuthRepository } from "./auth.repository";
import { LoginDTO } from "./dtos/login.dto";

export class AuthService {
  static async login(data: LoginDTO) {
    return await AuthRepository.login(data);
  }
}
