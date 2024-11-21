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
    addressLine1,
    addressLine2,
    country,
    state,
    city,
    neighborhood,
    postalCode,
  }: ICreateUserDTO): Promise<User>;
  update({
    user_id,
    name,
    phone,
    email,
    birthday,
    cpf,
    user_type,
    addressLine1,
    addressLine2,
    country,
    state,
    city,
    neighborhood,
    postalCode,
  }: ICreateUserDTO): Promise<Object>;
  findById(user_id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  findByCPF(cpf: string): Promise<User>;
  changePrivileges(user_id: number, user_type: string): Promise<User>;
  findAllUser(): Promise<User[]>;
  updateUserPhoto(user_id: number, photo: string): Promise<Object>
  deleteById(user_id: number): Promise<Boolean>;
}

export { IUserRepository, ICreateUserDTO };
