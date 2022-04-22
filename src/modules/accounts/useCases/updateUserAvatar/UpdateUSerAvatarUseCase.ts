import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}
