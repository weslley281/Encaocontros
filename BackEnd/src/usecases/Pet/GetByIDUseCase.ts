import { encrypt } from '../../utils/crypto';
import { Pet } from '../../models/Pet';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
  pet_id: number;
}

export class GetPetByIDUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest): Promise<Pet> {
    const pet = await this.petRepository.findById(data.pet_id);

    if (!pet) throw new AppError('Pet não existe');

    return this.petRepository.findById(data.pet_id);
  }
}
