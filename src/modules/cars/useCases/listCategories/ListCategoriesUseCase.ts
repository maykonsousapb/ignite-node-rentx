import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/IcategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
