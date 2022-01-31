import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

export class ListCategoriesUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }
  execute() {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
