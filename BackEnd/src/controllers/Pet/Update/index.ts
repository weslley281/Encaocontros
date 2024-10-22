import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { UpdateUserUseCase } from "../../../usecases/User/UpdateUseCase";
import { UpdateUserController } from "./UpdateController";

const usersRepository = UserRepository.getInstance();
const updateUserUseCase = new UpdateUserUseCase(usersRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };