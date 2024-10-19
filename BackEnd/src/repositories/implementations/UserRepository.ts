import { User } from '../../models/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';
import { userModel } from '../../database/userModel';

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
  }: ICreateUserDTO): Promise<User> {
    const user: any = await userModel.create({
      user_type,
      name,
      phone,
      email,
      cpf,
      birthday,
      password,
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
    password,
  }: ICreateUserDTO): Promise<User> {
    const user: any = await userModel.update(
      {
        user_id,
        user_type,
        name,
        phone,
        email,
        cpf,
        birthday,
        password,
      },
      { where: { user_id } }
    );

    return user;
  }

  async findById(user_id: number): Promise<User> {
    const user: any = await userModel.findOne({ where: { user_id } });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: any = await userModel.findOne({ where: { email: email } });

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
    const users: any = await userModel.findAll({ where: { name } });

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
}

export { UserRepository };
