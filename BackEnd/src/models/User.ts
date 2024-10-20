class User {
  user_id: number;
  photo: string;
  user_type: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthday: Date;
  password: string;

  constructor(
    user_id: number,
    user_type: string,
    photo: string,
    name: string,
    phone: string,
    email: string,
    cpf: string,
    birthday: Date,
    password: string
  ) {
    this.user_id = user_id;
    this.user_type = user_type;
    this.photo = photo
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.cpf = cpf;
    this.birthday = birthday;
    this.password = password;
  }

  getClientDetails(): string {
    return `Client ${this.name}.`;
  }
}

export { User };
