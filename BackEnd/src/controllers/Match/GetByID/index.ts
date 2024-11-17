import { GetMatchByIDUseCase } from "../../../usecases/Match/GetByIDUseCase";
import { MatchRepository } from "../../../repositories/implementations/MatchRepository";
import { GetMatchByIDController } from "./GetByIDController";


const matchsRepository = MatchRepository.getInstance();
const getMatchByIDUseCase = new GetMatchByIDUseCase(matchsRepository);
const getMatchByIDController = new GetMatchByIDController(getMatchByIDUseCase);

export { getMatchByIDController };