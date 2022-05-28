import { getRepository, Repository } from "typeorm";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      start_date,
      expected_return_date,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rentalBycar = await this.ormRepository.findOne({ car_id });

    return rentalBycar;
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalByuser = await this.ormRepository.findOne({ user_id });
    return rentalByuser;
  }
}
