import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
    avatar,
    user_id,
  }: ICreateUserDTO): Promise<User> {
    const passwordEncrypted = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists whith this email");
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordEncrypted,
      driver_license,
      avatar,
      user_id,
    });
    delete user.password;
    return user;
  }
}
