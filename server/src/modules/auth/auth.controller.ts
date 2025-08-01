import { Request, Response } from "express";
import { AuthAdminService } from "./auth.service";
import { parse, safeParse } from "zod";
import { loginSchema } from "./dtos/login.dto";

export class AuthController {
  static async login(req: Request, res: Response) {
    const data = parse(loginSchema, req.body);

    res.status(200).json(await AuthAdminService.login(data));
  }
}

