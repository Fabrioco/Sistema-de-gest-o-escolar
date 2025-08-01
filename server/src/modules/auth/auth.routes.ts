import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login/adm", AuthController.login);

export default router;