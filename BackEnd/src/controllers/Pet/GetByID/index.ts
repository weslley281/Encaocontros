import { GetPetByIDUseCase } from "../../../usecases/Pet/GetByIDUseCase";
import { PetRepository } from "../../../repositories/implementations/PetRepository";
import { GetPetByIDController } from "./GetByIDController";


const petsRepository = PetRepository.getInstance();
const getPetByIDUseCase = new GetPetByIDUseCase(petsRepository);
const getPetByIDController = new GetPetByIDController(getPetByIDUseCase);

export { getPetByIDController };