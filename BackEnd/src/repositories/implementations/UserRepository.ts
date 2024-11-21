import { User } from '../../models/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';
import { userModel } from '../../database/userModel';
import { Op } from 'sequelize';

class UserRepository implements IUserRepository {
  private static INSTANCE: UserRepository;

  public static getInstance() {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  async create({
    user_type,
    name,
    phone,
    email,
    cpf,
    birthday,
    password,
    addressLine1,
    addressLine2,
    country,
    state,
    city,
    neighborhood,
    postalCode,
  }: ICreateUserDTO): Promise<User> {
    const user: any = await userModel.create({
      user_type,
      name,
      phone,
      email,
      cpf,
      birthday,
      password,
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      neighborhood,
      postalCode,
    });

    return user;
  }

  async update({
    user_id,
    user_type,
    name,
    phone,
    email,
    cpf,
    birthday,
    addressLine1,
    addressLine2,
    country,
    state,
    city,
    neighborhood,
    postalCode,
  }: ICreateUserDTO): Promise<Object> {
    const user: any = await userModel.update(
      {
        user_id,
        user_type,
        name,
        phone,
        email,
        cpf,
        birthday,
        addressLine1,
        addressLine2,
        country,
        state,
        city,
        neighborhood,
        postalCode,
      },
      { where: { user_id } }
    );

    if (user) {
      return {
        user_id,
        user_type,
        name,
        phone,
        email,
        cpf,
        birthday,
      };
    } else {
      return { message: 'Error' };
    }
  }

  async findById(user_id: number): Promise<User> {
    const user: any = await userModel.findOne({ where: { user_id } });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: any = await userModel.findOne({ where: { email } });

    return user;
  }

  async findByCPF(cpf: string): Promise<User> {
    const user: any = await userModel.findOne({ where: { cpf } });

    return user;
  }

  async findAllUser(): Promise<User[]> {
    const user: any = await userModel.findAll();

    return user;
  }

  async deleteUser(user_id: number): Promise<boolean> {
    const deletedCount = await userModel.destroy({
      where: { user_id },
    });

    // Retorna true se a contagem de registros deletados for maior que 0, indicando sucesso
    return deletedCount > 0;
  }

  async findByName(name: string): Promise<User[]> {
    const users: any = await userModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Implementação do LIKE
        },
      },
    });

    return users;
  }

  async changePrivileges(user_id: number, user_type: string): Promise<User> {
    const user: any = await userModel.update(
      { user_type },
      { where: { user_id } }
    );

    const updatedUser: any = await userModel.findOne({ where: { user_id } });

    return updatedUser;
  }

  async updateUserPhoto(user_id: number, photo: string): Promise<Object> {
    // O update retorna um array onde a primeira posição é a contagem e a segunda são os registros afetados
    const [affectedCount, affectedRows] = await userModel.update(
      { photo }, // Supondo que você adicionou a coluna 'photo' ao seu modelo
      { where: { user_id }, returning: true } // 'returning: true' para receber os dados atualizados
    );

    if (affectedCount === 0) {
      throw new Error('Usuário não encontrado');
    }

    return affectedRows[0]; // Retorna o primeiro usuário atualizado
  }

  async deleteById(user_id: number): Promise<boolean> {
    const deletedCount = await userModel.destroy({
      where: { user_id },
    });

    return deletedCount > 0; // Retorna true se um usuário foi deletado, false caso contrário
  }
}

export { UserRepository };
