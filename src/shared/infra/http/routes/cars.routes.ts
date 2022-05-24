import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { EnsureAdmin } from "../middlewares/EnsureAdmin";
import { EnsureAutheticated } from "../middlewares/EnsureAutheticated";

const carRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carRoutes.use(EnsureAutheticated);
carRoutes.use(EnsureAdmin);
carRoutes.post("/", createCarController.handle);
carRoutes.post("/:id/specifications", createCarSpecificationController.handle);
carRoutes.post(
  "/:id/images",
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carRoutes };
