import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
describe("#CreateCategoryUseCase", () => {
  describe("Create a new Category", () => {
    beforeEach(() => {
      categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
      createCategoryUseCase = new CreateCategoryUseCase(
        categoryRepositoryInMemory
      );
    });

    it("Shoud be able to create a new category", async () => {
      const category = await createCategoryUseCase.execute({
        name: "Carros",
        description: "Carros",
      });

      expect(category).toHaveProperty("id");
      expect(category.name).toBe("Carros");
      expect(category.description).toBe("Carros");
    });

    it("Should not be able to create a new category with name exists", async () => {
      await createCategoryUseCase.execute({
        name: "Carros",
        description: "Carros",
      });

      await expect(
        createCategoryUseCase.execute({
          name: "Carros",
          description: "Carros",
        })
      ).rejects.toBeInstanceOf(Error);
    });
  });
});
