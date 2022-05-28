import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }
    const category = await this.categoriesRepository.create({
      name,
      description,
    });
    return category;
  }
}
