import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }
  handle(req: Request, res: Response) {
    const specifications = this.listSpecificationsUseCase.execute();
    return res.json(specifications);
  }
}
