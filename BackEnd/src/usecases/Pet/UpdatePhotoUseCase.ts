import { encrypt } from '../../utils/crypto';
import { Pet } from '../../models/Pet';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
  pet_id: number;
}

export class UpdatePetPhotoUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest, photoPath: string): Promise<Object> {
    const existingPet = await this.petRepository.findById(data.pet_id);

    if (!existingPet) {
      throw new AppError('Usuário não existe');
    }

    return await this.petRepository.updatePetPhoto(data.pet_id, photoPath);
  }
}
