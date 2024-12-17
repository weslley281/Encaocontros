import { encrypt } from '../../utils/crypto';
import { Pet } from '../../models/Pet';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
  pet_id: number;
  animal: string;
  name: string;
  birthday: Date;
  breed: string;
  gender: string;
  owner_id: number;
  vaccination_status: string;
  health_conditions: string;
  pedigree: boolean;
}

export class UpdatePetUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest): Promise<Object> {
    const existingPet = await this.petRepository.findById(data.pet_id);

    if (!existingPet) {
      throw new AppError('Usuário não existe');
    }

    return await this.petRepository.update(data);
  }
}
