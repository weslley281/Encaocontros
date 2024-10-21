import { encrypt } from '../../utils/crypto';
import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: number;
}

export class UpdateUserPhotoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest, photoPath: string): Promise<Object> {
    const existingUser = await this.userRepository.findById(data.user_id);

    if (!existingUser) {
      throw new AppError('Usuário não existe');
    }

    return await this.userRepository.updateUserPhoto(data.user_id, photoPath);
  }
}
