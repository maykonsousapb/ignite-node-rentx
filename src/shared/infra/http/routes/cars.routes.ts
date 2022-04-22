import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { EnsureAutheticated } from "../middlewares/EnsureAutheticated";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.use(EnsureAutheticated);
carRoutes.post("/", createCarController.handle);

export { carRoutes };
