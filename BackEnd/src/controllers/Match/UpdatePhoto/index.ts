import { PetRepository } from "../../../repositories/implementations/PetRepository";
import { UpdatePetPhotoUseCase } from "../../../usecases/Pet/UpdatePhotoUseCase";
import { UpdatePetPhotoController } from "./UpdatePhotoController";

const petsRepository = PetRepository.getInstance();
const updatePetPhotoUseCase = new UpdatePetPhotoUseCase(petsRepository);
const updatePetPhotoController = new UpdatePetPhotoController(updatePetPhotoUseCase);

export { updatePetPhotoController };