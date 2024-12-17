import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '../../../usecases/User/AuthenticateUseCase';

const createUserSchema = z.object({
  email: z.string().email({ message: 'Formato do email é inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
});

class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = createUserSchema.parse(req.body);

      const newUser = await this.authenticateUserUseCase.execute(validatedData);

      return res.status(201).json(newUser);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.errors,
        });
      }

      return res.status(400).json({ message: error.message });
    }
  }
}

export { AuthenticateUserController };
