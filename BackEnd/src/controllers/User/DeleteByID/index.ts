import { GetUserByIDUseCase } from "../../../usecases/User/GetByIDUseCase";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { GetUserByIDController } from "./DeleteByIDController";


const usersRepository = UserRepository.getInstance();
const getUserByIDUseCase = new GetUserByIDUseCase(usersRepository);
const getUserByIDController = new GetUserByIDController(getUserByIDUseCase);

export { getUserByIDController };