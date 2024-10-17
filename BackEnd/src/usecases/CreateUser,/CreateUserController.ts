import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      // Chamando o caso de uso para criar o usuário
      const newUser = await createUserUseCase.execute({ name, email, password });
      
      return res.status(201).json(newUser);  // Respondendo com o usuário criado
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
