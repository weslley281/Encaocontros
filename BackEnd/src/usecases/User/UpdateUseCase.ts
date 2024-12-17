import { encrypt } from '../../utils/crypto';
import { User } from '../../models/User';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: number;
  user_type: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<Object> {
    const existingUser = await this.userRepository.findById(data.user_id);

    if (!existingUser) {
      throw new AppError('Usuário não existe');
    }

    const encryptedCPF = encrypt(data.cpf);

    return await this.userRepository.update({
      ...data,
      cpf: encryptedCPF,
    });
  }
}
