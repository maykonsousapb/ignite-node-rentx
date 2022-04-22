import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = req.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    try {
      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      });

      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
