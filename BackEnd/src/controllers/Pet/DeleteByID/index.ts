import { PetRepository } from "../../../repositories/implementations/PetRepository";
import { DeletePetByIDController } from "./DeleteByIDController";
import { DeletePetByIDUseCase } from "../../../usecases/Pet/DeleteByIDUseCase";


const petsRepository = PetRepository.getInstance();
const deletePetByIDUseCase = new DeletePetByIDUseCase(petsRepository);
const deletePetByIDController = new DeletePetByIDController(deletePetByIDUseCase);

export { deletePetByIDController };