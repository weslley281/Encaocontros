import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateUserUseCase } from '../../../usecases/User/UpdateUseCase';

const updateUserSchema = z.object({
  user_id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'ID inválido' }),
  user_type: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
  email: z.string().email({ message: 'Formato do email é inválido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter mais de 11 dígitos' }),
  birthday: z.coerce.date({ message: 'Formato de data inválido' })
});

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = updateUserSchema.parse(req.body);

      const newUser = await this.updateUserUseCase.execute(validatedData);

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

export { UpdateUserController };
