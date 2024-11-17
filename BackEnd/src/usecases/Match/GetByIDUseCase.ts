import { encrypt } from '../../utils/crypto';
import { Match } from '../../models/Match';
import { AppError } from '../../errors/AppErros';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  match_id: number;
}

export class GetMatchByIDUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(data: IRequest): Promise<Match> {
    const match = await this.matchRepository.findById(data.match_id);

    if (!match) throw new AppError('Match não existe');

    return this.matchRepository.findById(data.match_id);
  }
}
