import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  // eslint-disable-next-line prettier/prettier
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    try {
      const category = await createCategoryUseCase.execute({
        name,
        description,
      });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
