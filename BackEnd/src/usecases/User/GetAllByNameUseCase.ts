import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  name: string;
}

export class GetAllUserByNameUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<User[]> {
    const users = await this.userRepository.findByName(data.name);

    if (!users) throw new AppError('Não há usuários cadastrado no banco');

    return this.userRepository.findByName(data.name);
  }
}
