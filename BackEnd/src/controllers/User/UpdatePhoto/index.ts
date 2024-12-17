import { UserRepository } from "../../../repositories/implementations/UserRepository";
import { UpdateUserPhotoUseCase } from "../../../usecases/User/UpdatePhotoUseCase";
import { UpdateUserPhotoController } from "./UpdatePhotoController";

const usersRepository = UserRepository.getInstance();
const updateUserPhotoUseCase = new UpdateUserPhotoUseCase(usersRepository);
const updateUserPhotoController = new UpdateUserPhotoController(updateUserPhotoUseCase);

export { updateUserPhotoController };