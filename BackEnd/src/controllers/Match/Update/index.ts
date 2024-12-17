import { MatchRepository } from "../../../repositories/implementations/MatchRepository";
import { UpdateMatchUseCase } from "../../../usecases/Match/UpdateUseCase";
import { UpdateMatchController } from "./UpdateController";

const matchsRepository = MatchRepository.getInstance();
const updateMatchUseCase = new UpdateMatchUseCase(matchsRepository);
const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export { updateMatchController };