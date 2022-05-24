import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpcificationUseCase";

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );
    try {
      const car = await createCarSpecificationUseCase.execute({
        car_id: id,
        specifications_id,
      });
      return response.json(car);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
