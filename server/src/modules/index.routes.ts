import authAdm from "./auth/auth.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authAdm);

export default router;