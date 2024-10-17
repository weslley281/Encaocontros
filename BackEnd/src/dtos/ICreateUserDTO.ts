export interface ICreateUserDTO {
  user_id?: number;
  name: string;
  phone: string;
  email: string;
  birthday: Date;
  cpf?: string;
  user_type: string;
  password?: string;
}
