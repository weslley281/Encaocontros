import { encrypt } from '../../utils/crypto';
import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: number;
}

export class GetUserByIDUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<User> {
    const user = await this.userRepository.findById(data.user_id);

    if (!user) throw new AppError('Usuário não existe');

    return this.userRepository.findById(data.user_id);
  }
}
