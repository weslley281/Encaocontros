import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepository } from '../../repositories/'; // Importando o repositório
import bcrypt from 'bcryptjs';

export class CreateUserUseCase {
  private userRepository = new UserRepository(); // Instanciando o repositório

  async execute(data: ICreateUserDTO): Promise<User> {
    // Verificando se o email já existe
    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criando o novo usuário
    return await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
