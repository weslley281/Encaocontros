export interface ICreateUserDTO {
  user_id?: number;
  name: string;
  phone: string;
  email: string;
  birthday: Date;
  cpf?: string;
  user_type: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  password?: string;
}
