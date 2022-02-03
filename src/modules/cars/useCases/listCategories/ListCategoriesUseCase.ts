import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
