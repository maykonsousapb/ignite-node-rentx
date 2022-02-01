import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoeriesUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categoriesFile: IImportCategory[] = [];
      const parsefile = csvParse();
      stream.pipe(parsefile);

      parsefile
        .on("data", async (line) => {
          const [name, description] = line;
          categoriesFile.push({ name, description });
        })
        .on("end", () => {
          resolve(categoriesFile);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);
      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
