import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AutenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Maykon Sousa",
      email: "maykon.sousa@hotmail.com",
      password: "123456",
      driver_license: "123456789",
    };

    await createUserUseCase.execute(user);

    const isUserAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(isUserAuthenticated).toHaveProperty("token");
  });

  it("Should not be able to authenticate an user with wrong credentials", async () => {
    const user: ICreateUserDTO = {
      name: "Maykon Sousa",
      email: "maykon.sousa@hotmail.com",
      password: "123456",
      driver_license: "123456789",
    };

    await createUserUseCase.execute(user);
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to authenticate an user with wrong email", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong-email",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
