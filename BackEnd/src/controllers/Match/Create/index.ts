import { MatchRepository } from '../../../repositories/implementations/MatchRepository';
import { CreateMatchUseCase } from '../../../usecases/Match/CreateUseCase';
import { CreateMatchController } from './CreateController';

const matchsRepository = MatchRepository.getInstance();
const createMatchUseCase = new CreateMatchUseCase(matchsRepository);
const createMatchController = new CreateMatchController(createMatchUseCase);

export { createMatchController };
