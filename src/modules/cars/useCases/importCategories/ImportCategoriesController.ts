import { Request, Response } from "express";

import { ImportCategoeriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private importCategoriesUseCase: ImportCategoeriesUseCase) { }
  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importCategoriesUseCase.execute(file);
    return res.json({ success: "File is upload" });
  }
}
