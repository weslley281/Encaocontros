import { Match } from '../../models/Match';
import { AppError } from '../../errors/AppErros';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  pet_id: number;
}

export class GetAllByIdPetUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(data: IRequest): Promise<Match[]> {
    const matchs = await this.matchRepository.findAllByIdPet(data.pet_id);

    if (!matchs) throw new AppError('Não há matchs cadastrado no banco');

    return this.matchRepository.findAllByIdPet(data.pet_id);
  }
}
