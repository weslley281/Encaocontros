import { Pet } from 'src/models/Pet';
import { ICreatePetDTO, IPetRepository } from '../IPetRepository';
import { petModel } from '../../database/petModel';
import { Op } from 'sequelize';

class PetRepository implements IPetRepository {
  private static INSTANCE: PetRepository;

  public static getInstance() {
    if (!PetRepository.INSTANCE) {
      PetRepository.INSTANCE = new PetRepository();
    }

    return PetRepository.INSTANCE;
  }

  async create({
    animal,
    name,
    birthday,
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
      birthday,
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
    birthday,
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
        birthday,
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

  async updatePetPhoto(pet_id: number, photo: string): Promise<Object> {
    // O update retorna um array onde a primeira posição é a contagem e a segunda são os registros afetados
    const [affectedCount, affectedRows] = await petModel.update(
      { photo }, // Supondo que você adicionou a coluna 'photo' ao seu modelo
      { where: { pet_id }, returning: true } // 'returning: true' para receber os dados atualizados
    );

    if (affectedCount === 0) {
      throw new Error('Pet não encontrado');
    }

    return affectedRows[0]; // Retorna o primeiro usuário atualizado
  }

  async deleteById(pet_id: number): Promise<boolean> {
    const deletedCount = await petModel.destroy({
      where: { pet_id },
    });

    return deletedCount > 0; // Retorna true se um usuário foi deletado, false caso contrário
  }
}

export { PetRepository };
