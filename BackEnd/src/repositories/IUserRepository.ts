import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../models/User';

interface IUserRepository {
  create({
    name,
    phone,
    email,
    birthday,
    cpf,
    user_type,
    password,
  }: ICreateUserDTO): Promise<User>;
  update({
    user_id,
    name,
    phone,
    email,
    birthday,
    cpf,
    user_type,
  }: ICreateUserDTO): Promise<Object>;
  findById(user_id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  findByCPF(cpf: string): Promise<User>;
  changePrivileges(user_id: number, user_type: string): Promise<User>;
  findAllUser(): Promise<User[]>;
}

export { IUserRepository, ICreateUserDTO };
