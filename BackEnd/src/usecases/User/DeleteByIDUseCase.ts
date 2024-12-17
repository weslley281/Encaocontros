import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: number;
}

export class DeleteUserByIDUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<Boolean> {
    const user = await this.userRepository.deleteById(data.user_id);

    if (!user) throw new AppError('Usuário não existe');

    return this.userRepository.deleteById(data.user_id);
  }
}
