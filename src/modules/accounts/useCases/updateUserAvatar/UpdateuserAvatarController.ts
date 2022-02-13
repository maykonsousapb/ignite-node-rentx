import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUSerAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    const avatarFile = req.file.filename;

    try {
      await updateAvatarUseCase.execute({ user_id: id, avatarFile });
      return res.status(200).json({ success: "file was uploaded" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
