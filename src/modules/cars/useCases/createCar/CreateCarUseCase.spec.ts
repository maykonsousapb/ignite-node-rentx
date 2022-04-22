import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("CreateCar", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to  create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Gol",
      description: "Gol GV 4 portas",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "VOLKSWAGEN",
      category_id: "FDSF456432",
    });

    expect(car).toHaveProperty("id");
    expect(car.available).toBe(true);
  });

  it("Should not be able to create a car with same licence plate", async () => {
    await createCarUseCase.execute({
      name: "car1",
      description: "Gol GV 4 portas",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "VOLKSWAGEN",
      category_id: "FDSF456432",
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: "Car2",
        description: "Gol GV 4 portas",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "VOLKSWAGEN",
        category_id: "FDSF456432",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
