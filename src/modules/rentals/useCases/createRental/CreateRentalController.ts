import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const { car_id, start_date, expected_return_date } = req.body;
    const user_id = req.user.id;

    try {
      const rental = await createRentalUseCase.execute({
        car_id,
        start_date,
        expected_return_date,
        user_id,
      });
      return res.status(201).json(rental);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
