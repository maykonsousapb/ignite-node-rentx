import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase ";

export class CreateSpecificationController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }
  handle(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const specification = this.createSpecificationUseCase.execute({
        name,
        description,
      });
      return res.status(201).json(specification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
