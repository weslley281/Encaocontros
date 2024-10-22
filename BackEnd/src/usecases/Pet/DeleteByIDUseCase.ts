import { Pet } from '../../models/Pet';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
  pet_id: number;
}

export class DeletePetByIDUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest): Promise<Boolean> {
    const pet = await this.petRepository.deleteById(data.pet_id);

    if (!pet) throw new AppError('Pet não existe');

    return this.petRepository.deleteById(data.pet_id);
  }
}
