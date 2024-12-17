import { Pet } from '../../models/Pet';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
  name: string;
}

export class GetAllPetByNameUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest): Promise<Pet[]> {
    const pets = await this.petRepository.findByName(data.name);

    if (!pets) throw new AppError('Não há pets cadastrado no banco');

    return this.petRepository.findByName(data.name);
  }
}
