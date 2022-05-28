import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { EnsureAutheticated } from "@shared/infra/http/middlewares/EnsureAutheticated";

import { EnsureAdmin } from "../middlewares/EnsureAdmin";

export const categoriesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.use(EnsureAutheticated);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.use(EnsureAdmin);
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);
