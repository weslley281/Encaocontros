import { PetRepository } from "../../../repositories/implementations/PetRepository";
import { UpdatePetUseCase } from "../../../usecases/Pet/UpdateUseCase";
import { UpdatePetController } from "./UpdateController";

const petsRepository = PetRepository.getInstance();
const updatePetUseCase = new UpdatePetUseCase(petsRepository);
const updatePetController = new UpdatePetController(updatePetUseCase);

export { updatePetController };