import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/dateProvider/DayJs/DayJsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("CreateRentalUseCase", () => {
  const dayAdd24Hours = dayjs(new Date()).add(48, "hours").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("should be able to create a rental", async () => {
    const request = {
      car_id: "car-id",
      user_id: "user-id",
      start_date: new Date(),
      expected_return_date: dayAdd24Hours,
    };
    const rental = await createRentalUseCase.execute(request);
    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to create a new rental for a user who already has a rental in progress", async () => {
    const request = {
      car_id: "car-id",
      user_id: "user-id",
      start_date: new Date(),
      expected_return_date: dayAdd24Hours,
    };
    await createRentalUseCase.execute(request);

    expect(async () => {
      await createRentalUseCase.execute({ ...request, car_id: "car-id-2" });
    }).rejects.toThrow("User already has a rental in progress");
  });

  it("Should not be able to create a new rental for a car that is already rented", async () => {
    const request = {
      car_id: "car-id",
      user_id: "user-id",
      start_date: new Date(),
      expected_return_date: dayAdd24Hours,
    };
    await createRentalUseCase.execute(request);

    expect(async () => {
      await createRentalUseCase.execute({ ...request, user_id: "user-id-2" });
    }).rejects.toThrow("Car is unavailable");
  });

  it("Should not be able to create a new rental without minimum 24 hours between start and expected return date", async () => {
    const request = {
      car_id: "car-id",
      user_id: "user-id",
      start_date: new Date(),
      expected_return_date: new Date(),
    };
    expect(async () => {
      await createRentalUseCase.execute(request);
    }).rejects.toThrow(
      "Expected return date must be at least 24 hours from start date"
    );
  });
});
