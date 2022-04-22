/* eslint-disable no-use-before-define */
import { Repository, getRepository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/IcategoriesRepository";

import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);
    return category;
  }
}
