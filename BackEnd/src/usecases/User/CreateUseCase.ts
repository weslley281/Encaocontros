import { encrypt } from '../../utils/crypto';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { AppError } from '../../errors/AppErros';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_type: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  password: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IRequest): Promise<User> {
    const existingEmailUser = await this.userRepository.findByEmail(data.email);
    const existingCPFUser = await this.userRepository.findByCPF(data.cpf);

    if (existingEmailUser || existingCPFUser) {
      throw new AppError('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const encryptedCPF = encrypt(data.cpf);

    return await this.userRepository.create({
      ...data,
      password: hashedPassword,
      cpf: encryptedCPF,
    });
  }
}
