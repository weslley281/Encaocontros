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
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;

  constructor(
    user_id: number,
    user_type: string,
    photo: string,
    name: string,
    phone: string,
    email: string,
    cpf: string,
    birthday: Date,
    password: string,
    addressLine1: string,
    addressLine2: string,
    country: string,
    state: string,
    city: string,
    neighborhood: string,
    postalCode: string,
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
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.country = country;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.postalCode = postalCode;
  }

  getClientDetails(): string {
    return `Client ${this.name}.`;
  }
}

export { User };
