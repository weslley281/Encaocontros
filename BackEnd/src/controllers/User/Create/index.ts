import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { CreateUserUseCase } from "../../../usecases/User/CreateUseCase";
import { CreateUserController } from "./CreateController";

const usersRepository = UserRepository.getInstance();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };