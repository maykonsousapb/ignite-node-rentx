import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ ...data }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      ...data,
    });
    await this.repository.save(user);
    return user;
  }
}
