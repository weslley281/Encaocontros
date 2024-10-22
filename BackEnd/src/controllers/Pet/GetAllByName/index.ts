import { GetAllPetByNameUseCase } from "../../../usecases/Pet/GetAllByNameUseCase";
import { PetRepository } from "../../../repositories/implementations/PetRepository";
import { GetAllPetByNameController } from "./GetAllByNameController";


const petsRepository = PetRepository.getInstance();
const getAllPetByNameUseCase = new GetAllPetByNameUseCase(petsRepository);
export const getAllPetByNameController = new GetAllPetByNameController(getAllPetByNameUseCase);