import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }
  execute({ description, name }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already existt");
    }
    const category = this.categoriesRepository.create({ name, description });
    return category;
  }
}
