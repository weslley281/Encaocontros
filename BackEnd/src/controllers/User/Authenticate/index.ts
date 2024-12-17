import { AuthenticateUserUseCase } from "../../../usecases/User/AuthenticateUseCase";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";

const usersRepository = UserRepository.getInstance();
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserController };