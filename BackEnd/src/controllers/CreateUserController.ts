import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from '../usecases/CreateUser,/CreateUserUseCase';

const createClientSchema = z.object({
  user_type: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z
    .string()
    .min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
  email: z.string().email({ message: 'Formato do email é invalido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter mais de 11 digitos' }),
  birthday: z.coerce.date({ message: 'Formato de data invalido' }), // Zod converte para objeto Date
  password: z
    .string()
    .min(6, { message: 'A senha deve ter mais de 10 caracteres' }),
});

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const validatedData = createClientSchema.parse(req.body);

    const createUserUseCase = new CreateUserUseCase();

    try {
      const newUser = await createUserUseCase.execute(validatedData);

      return res.status(201).json(newUser); // Respondendo com o usuário criado
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreateUserController };
