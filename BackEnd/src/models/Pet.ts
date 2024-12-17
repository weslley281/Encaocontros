class Pet {
  dog_id: number;
  animal: string;
  name: string;
  birthday: Date;
  breed: string;
  gender: string;
  owner_id: number;
  vaccination_status: string;
  health_conditions: string;
  pedigree: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    dog_id: number,
    animal: string,
    name: string,
    birthday: Date,
    breed: string,
    gender: string,
    owner_id: number,
    vaccination_status: string,
    health_conditions: string,
    pedigree: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.dog_id = dog_id;
    this.animal = animal;
    this.name = name;
    this.birthday = birthday;
    this.birthday = birthday;
    this.breed = breed;
    this.gender = gender;
    this.owner_id = owner_id;
    this.vaccination_status = vaccination_status;
    this.health_conditions = health_conditions;
    this.pedigree = pedigree;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getClientDetails(): string {
    return `Pet ${this.name}.`;
  }
}

export { Pet };
