import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

export class ListSpecificationsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationRepository: ISpecificationsRepository) { }
  execute() {
    const specifications = this.specificationRepository.list();
    return specifications;
  }
}
