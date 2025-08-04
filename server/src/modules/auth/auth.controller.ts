import { Request, Response } from "express";
import { loginSchema } from "./dtos/login.dto";
import authService from "./auth.service";

class AuthController {
  public async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);

    return res.status(200).json(result);
  }

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    
    await authService.forgotPassword(email); 
    res.json({ message: "Email enviado com sucesso" });
  }

  public async resetPassword(req: Request, res: Response) {
    const { email, password } = req.body;
    await authService.resetPassword(email, password);
    res.json({ message: "Senha alterada com sucesso" });
  }
}

export default new AuthController();
