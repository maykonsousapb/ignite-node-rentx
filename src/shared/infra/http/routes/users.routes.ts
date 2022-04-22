import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateuserAvatarController";
import { EnsureAutheticated } from "@shared/infra/http/middlewares/EnsureAutheticated";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);
usersRoutes.use(EnsureAutheticated);
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
