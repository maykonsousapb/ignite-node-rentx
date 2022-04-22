import { User } from "../infra/typeorm/entities/User";

export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  user_id?: string;
  avatar?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
