import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICarsRepository {
  findByLicencePlate(license_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
  create(data: ICreateCarDTO): Promise<Car>;
}
