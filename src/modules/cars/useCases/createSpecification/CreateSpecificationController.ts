import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase ";

export class CreateSpecificationController {
  // eslint-disable-next-line prettier/prettier
  async handle(req: Request, res: Response): Promise<Response> {
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );
    const { name, description } = req.body;

    try {
      const specification = await createSpecificationUseCase.execute({
        name,
        description,
      });
      return res.status(201).json(specification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
