import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listCategoryUseCase: ListCategoriesUseCase) { }
  handle(req: Request, res: Response) {
    const list = this.listCategoryUseCase.execute();
    return res.json(list);
  }
}
