import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/dateProvider/IDateProvider";

interface IRequest {
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
}
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );
    if (carUnavailable) {
      throw new Error("Car is unavailable");
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new Error("User already has a rental in progress");
    }

    const compare = this.dateProvider.compare({
      startDate: start_date,
      endDate: expected_return_date,
      unit: "hour",
    });

    if (compare < 24) {
      throw new Error(
        "Expected return date must be at least 24 hours from start date"
      );
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date: new Date(),
    });
    return rental;
  }
}
