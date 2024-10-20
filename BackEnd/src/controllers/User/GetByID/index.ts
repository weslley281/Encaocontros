import { GetUserByIDUseCase } from "../../../usecases/User/GetUserByIDUseCase";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { GetUserByIDController } from "./GetUserByIDController";


const usersRepository = UserRepository.getInstance();
const getUserByIDUseCase = new GetUserByIDUseCase(usersRepository);
const getUserByIDController = new GetUserByIDController(getUserByIDUseCase);

export { getUserByIDController };