import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export const EnsureAutheticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(500).json({ error: "Token is missing" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "7e5b4dfbfb796a022ed670ebf78d9432"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch {
    res.status(500).json({ error: "token is invalid" });
  }
};
