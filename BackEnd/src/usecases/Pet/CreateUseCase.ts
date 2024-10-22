import { encrypt } from '../../utils/crypto';
import { Pet } from '../../models/Pet';
import bcrypt from 'bcryptjs';
import { AppError } from '../../errors/AppErros';
import { IPetRepository } from '../../repositories/IPetRepository';

interface IRequest {
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

export class CreatePetUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: IRequest): Promise<Pet> {
    return await this.petRepository.create(data);
  }
}
