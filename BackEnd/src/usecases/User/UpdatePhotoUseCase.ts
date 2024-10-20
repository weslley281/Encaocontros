import { encrypt } from '../../utils/crypto';
import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: number;
  photo: string;
}

export class UpdateUserPhotoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<Object> {
    const existingUser = await this.userRepository.findById(data.user_id);

    if (!existingUser) {
      throw new AppError('Usuário não existe');
    }

    return await this.userRepository.updateUserPhoto(data.user_id, data.photo);
  }
}
