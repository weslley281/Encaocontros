
import { MatchRepository } from "../../../repositories/implementations/MatchRepository";
import { GetAllByIdPetController } from "./GetAllByIdPetController";
import { GetAllByIdPetUseCase } from "../../../usecases/Match/GetAllByIdPetUseCase";


const matchsRepository = MatchRepository.getInstance();
const getAllByIdMatchUseCase = new GetAllByIdPetUseCase(matchsRepository);
export const getAllByIdPetController = new GetAllByIdPetController(getAllByIdMatchUseCase);