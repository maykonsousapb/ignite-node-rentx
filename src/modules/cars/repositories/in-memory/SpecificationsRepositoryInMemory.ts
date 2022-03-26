import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (Specification) => Specification.name === name
    );
    return specification;
  }
  async list(): Promise<Specification[]> {
    const allSpecifications = this.specifications;
    return allSpecifications;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
    return specification;
  }
}
