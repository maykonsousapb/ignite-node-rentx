import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export const EnsureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.isAdmin) {
    return res.status(401).json({
      error: "You must be an admin to access this route",
    });
  }
  return next();
};
