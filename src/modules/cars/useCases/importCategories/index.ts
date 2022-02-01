import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoeriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoriesUseCase = new ImportCategoeriesUseCase(
  categoriesRepository
);
export const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
);
