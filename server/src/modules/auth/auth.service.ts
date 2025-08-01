import { AuthRepository } from "./auth.repository";
import { LoginDTO } from "./dtos/login.dto";

export class AuthAdminService {
  static async login(data: LoginDTO) {
    return await AuthRepository.loginAdmin(data);
  }
}
