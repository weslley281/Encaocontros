import { encrypt } from 'src/utils/crypto';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../models/User';
import { UserRepository } from '../../repositories/implementations/UserRepository'; // Importando o repositório
import bcrypt from 'bcryptjs';

interface IRequest {
  user_type: string
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  password: string;
}

export class CreateUserUseCase {
  private userRepository = new UserRepository(); // Instanciando o repositório

  async execute(data: IRequest): Promise<User> {
    // Verificando se o email já existe
    const existingEmailUser = await this.userRepository.findByEmail(data.email);
    const existingCPFUser = await this.userRepository.findByCPF(data.cpf);
    
    if (existingEmailUser || existingCPFUser) {
      throw new Error('Usuário já existe');
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const encryptedCPF = encrypt(data.cpf);
    
    // Criando o novo usuário
    return await this.userRepository.create({
      ...data,
      password: hashedPassword,
      cpf: encryptedCPF
    });
  }
}
