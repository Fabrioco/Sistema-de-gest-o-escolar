import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errors/http-errors";

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

    next(error);
  }

  static async errorApp(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if(error instanceof HttpError) {

      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
