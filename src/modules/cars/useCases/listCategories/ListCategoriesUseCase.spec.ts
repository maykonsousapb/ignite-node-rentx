import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to list all categories", async () => {
    await categoriesRepositoryInMemory.create({
      name: "Category 1",
      description: "Description 1",
    });
    const categories = await listCategoriesUseCase.execute();
    expect(categories).toHaveLength(1);
    expect(categories[0].name).toBe("Category 1");
  });
});
