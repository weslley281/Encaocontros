import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from '../../../usecases/User/CreateUseCase';

const createUserSchema = z.object({
  user_type: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
  email: z.string().email({ message: 'Formato do email é inválido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter mais de 11 dígitos' }),
  birthday: z.coerce.date({ message: 'Formato de data inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  addressLine1: z.string().min(1, { message: 'O Endereço é obrigatório' }),
  addressLine2: z.string().min(1, { message: 'O Endereço é obrigatório' }),
  country: z.string().min(1, { message: 'O País é obrigatório' }),
  state: z.string().min(1, { message: 'O Estado é obrigatório' }),
  city: z.string().min(1, { message: 'A cidade é obrigatório' }),
  neighborhood: z.string().min(1, { message: 'O Bairro é obrigatório' }),
  postalCode: z.string().min(1, { message: 'O código postal é obrigatório' }),
});

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = createUserSchema.parse(req.body);

      const newUser = await this.createUserUseCase.execute(validatedData);

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

export { CreateUserController };
