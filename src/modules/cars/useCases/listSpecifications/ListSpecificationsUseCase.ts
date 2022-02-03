import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute() {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}
