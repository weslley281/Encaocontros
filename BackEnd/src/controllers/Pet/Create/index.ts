import { PetRepository } from '../../../repositories/implementations/PetRepository';
import { CreatePetUseCase } from '../../../usecases/Pet/CreateUseCase';
import { CreatePetController } from './CreateController';

const petsRepository = PetRepository.getInstance();
const createPetUseCase = new CreatePetUseCase(petsRepository);
const createPetController = new CreatePetController(createPetUseCase);

export { createPetController };
