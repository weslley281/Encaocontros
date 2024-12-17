import { Match } from '../../models/Match';
import { AppError } from '../../errors/AppErros';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  match_id: number;
}

export class DeleteMatchByIDUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(data: IRequest): Promise<Boolean> {
    const match = await this.matchRepository.deleteById(data.match_id);

    if (!match) throw new AppError('Match não existe');

    return this.matchRepository.deleteById(data.match_id);
  }
}
