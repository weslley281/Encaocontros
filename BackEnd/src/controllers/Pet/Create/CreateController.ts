import { Request, Response } from 'express';
import { z } from 'zod';
import { CreatePetUseCase } from '../../../usecases/Pet/CreateUseCase';

const createPetSchema = z.object({
  animal: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  birthday: z.coerce.date({ message: 'Formato de data inválido' }),
  breed: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  gender: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  owner_id: z.number().int(),
  vaccination_status: z
    .string()
    .min(1, { message: 'O tipo do usuário é obrigatório' }),
  health_conditions: z
    .string()
    .min(1, { message: 'O tipo do usuário é obrigatório' }),
  pedigree: z.boolean(),
});

class CreatePetController {
  constructor(private createPetUseCase: CreatePetUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = createPetSchema.parse(req.body);

      const newPet = await this.createPetUseCase.execute(validatedData);

      return res.status(201).json(newPet);
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

export { CreatePetController };
