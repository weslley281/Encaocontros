import { encrypt } from '../../utils/crypto';
import { Match } from '../../models/Match';
import { AppError } from '../../errors/AppErros';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  match_id: number;
  user1_id: number;
  user2_id: number;
  pet1_id: number;
  pet2_id: number;
  status: string;
}

export class UpdateMatchUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(data: IRequest): Promise<Object> {
    const existingMatch = await this.matchRepository.findById(data.match_id);

    if (!existingMatch) {
      throw new AppError('Match não existe');
    }

    return await this.matchRepository.update(data);
  }
}
