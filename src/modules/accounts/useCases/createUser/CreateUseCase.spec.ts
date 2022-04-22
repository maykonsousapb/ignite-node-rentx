import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("#CreateUserUseCase", () => {
  describe("Create User", () => {
    beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();

      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create an user", async () => {
      const userData: ICreateUserDTO = {
        name: "Maykon Sousa",
        email: "maykon.sousa@hotmail.com",
        password: "123456",
        driver_license: "123456789",
      };
      const user = await createUserUseCase.execute(userData);
      expect(user).toHaveProperty("id");
    });

    it("Should not be able to create a new user with e-mail exists", async () => {
      const userData: ICreateUserDTO = {
        name: "Maykon Sousa",
        email: "maykon.sousa@hotmail.com",
        password: "123456",
        driver_license: "123456789",
      };
      await createUserUseCase.execute(userData);
      expect(async () => {
        await createUserUseCase.execute(userData);
      }).rejects.toBeInstanceOf(Error);
    });
  });
});
