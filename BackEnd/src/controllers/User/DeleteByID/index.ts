import { DeleteUserByIDUseCase } from "../../../usecases/User/DeleteByIDUseCase";
import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { DeleteUserByIDController } from "./DeleteByIDController";


const usersRepository = UserRepository.getInstance();
const deleteUserByIDUseCase = new DeleteUserByIDUseCase(usersRepository);
const deleteUserByIDController = new DeleteUserByIDController(deleteUserByIDUseCase);

export { deleteUserByIDController };