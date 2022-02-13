import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    try {
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
