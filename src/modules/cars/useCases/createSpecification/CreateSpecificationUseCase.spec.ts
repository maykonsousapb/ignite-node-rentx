import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase ";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("#CreateSpecificationUseCase", () => {
  describe("Create a new Specification", () => {
    beforeEach(() => {
      specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
      createSpecificationUseCase = new CreateSpecificationUseCase(
        specificationsRepositoryInMemory
      );
    });

    it("Shoud be able to create a new specification", async () => {
      const specification = await createSpecificationUseCase.execute({
        name: "Carros",
        description: "Carros",
      });

      expect(specification).toHaveProperty("id");
      expect(specification.name).toBe("Carros");
      expect(specification.description).toBe("Carros");
    });

    it("Should not be able to create a new specification with name exists", async () => {
      await createSpecificationUseCase.execute({
        name: "Carros",
        description: "Carros",
      });

      await expect(
        createSpecificationUseCase.execute({
          name: "Carros",
          description: "Carros",
        })
      ).rejects.toBeInstanceOf(Error);
    });
  });
});
