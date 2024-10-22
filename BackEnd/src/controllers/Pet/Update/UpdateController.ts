import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdatePetUseCase } from '../../../usecases/Pet/UpdateUseCase';

const updatePetSchema = z.object({
  pet_id: z.number().int(),
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

class UpdatePetController {
  constructor(private updatePetUseCase: UpdatePetUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = updatePetSchema.parse(req.body);

      const newPet = await this.updatePetUseCase.execute(validatedData);

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

export { UpdatePetController };
