import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateUserUseCase } from '../../../usecases/User/UpdateUseCase';

const updateUserSchema = z.object({
  user_id: z.number().int(),
  user_type: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
  email: z.string().email({ message: 'Formato do email é inválido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter mais de 11 dígitos' }),
  birthday: z.coerce.date({ message: 'Formato de data inválido' }),
  addressLine1: z.string().min(1, { message: 'O Endereço é obrigatório' }),
  addressLine2: z.string().min(1, { message: 'O Endereço é obrigatório' }),
  country: z.string().min(1, { message: 'O País é obrigatório' }),
  state: z.string().min(1, { message: 'O Estado é obrigatório' }),
  city: z.string().min(1, { message: 'A cidade é obrigatório' }),
  neighborhood: z.string().min(1, { message: 'O Bairro é obrigatório' }),
  postalCode: z.string().min(1, { message: 'O código postal é obrigatório' }),
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
