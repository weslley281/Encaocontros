import { ICreatePetDTO } from '../dtos/ICreatePetDTO';
import { Pet } from '../models/Pet';

interface IPetRepository {
  create({
    animal,
    name,
    birthday,
    breed,
    gender,
    owner_id,
    vaccination_status,
    health_conditions,
    pedigree,
  }: ICreatePetDTO): Promise<Pet>;
  update({
    pet_id,
    animal,
    name,
    birthday,
    breed,
    gender,
    owner_id,
    vaccination_status,
    health_conditions,
    pedigree,
  }: ICreatePetDTO): Promise<Object>;
  findById(pet_id: number): Promise<Pet>;
  findByName(name: string): Promise<Pet[]>;
  findAllPet(): Promise<Pet[]>;
  updatePetPhoto(pet_id: number, photo: string): Promise<Object>;
  deleteById(pet_id: number): Promise<Boolean>;
}

export { IPetRepository, ICreatePetDTO };
