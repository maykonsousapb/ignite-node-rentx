import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { EnsureAutheticated } from "../middlewares/EnsureAutheticated";

export const rentalRoutes = Router();

const createRentalcontroller = new CreateRentalController();

rentalRoutes.use(EnsureAutheticated);
rentalRoutes.post("/", createRentalcontroller.handle);
