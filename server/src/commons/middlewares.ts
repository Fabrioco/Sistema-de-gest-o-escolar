import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class Middleware {
  static async errorZod(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }
  }
}
