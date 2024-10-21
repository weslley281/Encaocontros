import { GetAllUserByNameUseCase } from "../../../usecases/User/GetAllByNameUseCase";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { GetAllUserByNameController } from "./GetAllByNameController";


const usersRepository = UserRepository.getInstance();
const getAllUserByNameUseCase = new GetAllUserByNameUseCase(usersRepository);
export const getAllUserByNameController = new GetAllUserByNameController(getAllUserByNameUseCase);