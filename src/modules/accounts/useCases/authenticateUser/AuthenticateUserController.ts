import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AutenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    try {
      const token = await authenticateUserUseCase.execute({ email, password });
      return res.status(200).json(token);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
