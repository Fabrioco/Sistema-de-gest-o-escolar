import { Request, Response } from "express";
import { loginSchema } from "./dtos/login.dto";
import authService from "./auth.service";

class AuthController {
  public async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);

    return res.status(200).json(result);
  }
}

export default new AuthController();