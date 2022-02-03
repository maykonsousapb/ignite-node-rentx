import { User } from "../entities/User";

export interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
}
