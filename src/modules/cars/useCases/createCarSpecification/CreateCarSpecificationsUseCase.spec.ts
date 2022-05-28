import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("CreateCarSpecificationsUseCase", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new Error("Car not found!"));
  });

  it("Should be able to create a new spacification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification1",
      description: "Specification description",
    });

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(carWithSpecifications).toHaveProperty("specifications");
    expect(carWithSpecifications.specifications).toEqual([specification]);
  });
});
