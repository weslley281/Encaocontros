import { Match } from 'src/models/Match';
import { ICreateMatchDTO, IMatchRepository } from '../IMatchRepository';
import { matchModel } from '../../database/matchModel';
import { Op } from 'sequelize';

class MatchRepository implements IMatchRepository {
  private static INSTANCE: MatchRepository;

  public static getInstance() {
    if (!MatchRepository.INSTANCE) {
      MatchRepository.INSTANCE = new MatchRepository();
    }

    return MatchRepository.INSTANCE;
  }

  async create({
    user1_id,
    user2_id,
    pet1_id,
    pet2_id,
    status,
  }: ICreateMatchDTO): Promise<Match> {
    const match: any = await matchModel.create({
      user1_id,
      user2_id,
      pet1_id,
      pet2_id,
      status,
    });

    return match;
  }

  async update({
    match_id,
    user1_id,
    user2_id,
    pet1_id,
    pet2_id,
    status,
  }: ICreateMatchDTO): Promise<Object> {
    const match: any = await matchModel.update(
      {
        match_id,
        user1_id,
        user2_id,
        pet1_id,
        pet2_id,
        status,
      },
      { where: { match_id } }
    );

    return match;
  }

  async findById(match_id: number): Promise<Match> {
    const match: any = await matchModel.findOne({ where: { match_id } });

    return match;
  }

  async findAllMatch(): Promise<Match[]> {
    const matchs: any = await matchModel.findAll();

    return matchs;
  }

  async findAllByIdPet(pet_id: number): Promise<Match[]> {
    const matchs: any = await matchModel.findAll({
      where: {
        [Op.or]: [
          { pet1_id: pet_id },
          { pet2_id: pet_id }
        ]
      }
    });
  
    return matchs;
  }
  
  

  async deleteById(match_id: number): Promise<boolean> {
    const deletedCount = await matchModel.destroy({
      where: { match_id },
    });

    return deletedCount > 0; // Retorna true se um usuário foi deletado, false caso contrário
  }
}

export { MatchRepository };
