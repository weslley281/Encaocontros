import { encrypt } from '../../utils/crypto';
import { Match } from '../../models/Match';
import bcrypt from 'bcryptjs';
import { AppError } from '../../errors/AppErros';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  user1_id: number;
  user2_id: number;
  pet1_id: number;
  pet2_id: number;
  status: string;
}

export class CreateMatchUseCase {
  constructor(private matchRepository: IMatchRepository) {}

  async execute(data: IRequest): Promise<Match> {
    return await this.matchRepository.create(data);
  }
}
