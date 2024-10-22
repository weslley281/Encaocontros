import { Pet } from 'src/models/Pet';
import { ICreatePetDTO, IPetRepository } from '../IPetRepository';
import { petModel } from '../../database/petModel';
import { Op } from 'sequelize';

class PetRepository implements IPetRepository {
  private static INSTANCE: PetRepository;

  async create({
    animal,
    name,
    age,
    breed,
    gender,
    owner_id,
    vaccination_status,
    health_conditions,
    pedigree,
  }: ICreatePetDTO): Promise<Pet> {
    const pet: any = await petModel.create({
      animal,
      name,
      age,
      breed,
      gender,
      owner_id,
      vaccination_status,
      health_conditions,
      pedigree,
    });

    return pet;
  }

  async update({
    pet_id,
    animal,
    name,
    age,
    breed,
    gender,
    owner_id,
    vaccination_status,
    health_conditions,
    pedigree,
  }: ICreatePetDTO): Promise<Object> {
    const pet: any = await petModel.update(
      {
        pet_id,
        animal,
        name,
        age,
        breed,
        gender,
        owner_id,
        vaccination_status,
        health_conditions,
        pedigree,
      },
      { where: { pet_id } }
    );

    return pet;
  }

  async findById(pet_id: number): Promise<Pet> {
    const pet: any = await petModel.findOne({ where: { pet_id } });

    return pet;
  }

  async findByName(name: string): Promise<Pet[]> {
    const pets: any = await petModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Implementação do LIKE
        },
      },
    });

    return pets;
  }

  async findAllPet(): Promise<Pet[]> {
    const pets: any = petModel.findAll();

    return pets;
  }
}

export { PetRepository };
