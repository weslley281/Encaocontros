import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';
import { Match } from '../models/Match';

interface IMatchRepository {
  create({
    user1_id,
    user2_id,
    pet1_id,
    pet2_id,
    status,
  }: ICreateMatchDTO): Promise<Match>;
  update({
    match_id,
    user1_id,
    user2_id,
    pet1_id,
    pet2_id,
    status,
  }: ICreateMatchDTO): Promise<Object>;
  findById(match_id: number): Promise<Match>;
  findAllByIdPet(pet_id: number): Promise<Match[]>;
  findAllMatch(): Promise<Match[]>;
  deleteById(match_id: number): Promise<Boolean>;
}

export { IMatchRepository, ICreateMatchDTO };
