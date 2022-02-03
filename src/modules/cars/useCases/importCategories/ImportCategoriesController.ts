import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoeriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  // eslint-disable-next-line prettier/prettier
  async handle(req: Request, res: Response): Promise<Response> {
    const importCategoriesUseCase = container.resolve(ImportCategoeriesUseCase);
    const { file } = req;
    await importCategoriesUseCase.execute(file);
    return res.json({ success: "File is upload" });
  }
}
