import { MatchRepository } from "../../../repositories/implementations/MatchRepository";
import { DeleteMatchByIDController } from "./DeleteByIDController";
import { DeleteMatchByIDUseCase } from "../../../usecases/Match/DeleteByIDUseCase";


const matchsRepository = MatchRepository.getInstance();
const deleteMatchByIDUseCase = new DeleteMatchByIDUseCase(matchsRepository);
const deleteMatchByIDController = new DeleteMatchByIDController(deleteMatchByIDUseCase);

export { deleteMatchByIDController };