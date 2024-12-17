import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateMatchUseCase } from '../../../usecases/Match/UpdateUseCase';

const updateMatchSchema = z.object({
  match_id: z.number().int(),
  user1_id: z.number().int(),
  user2_id: z.number().int(),
  pet1_id: z.number().int(),
  pet2_id: z.number().int(),
  status: z.string().min(1, { message: 'O status é obrigatório' }),
});

class UpdateMatchController {
  constructor(private updateMatchUseCase: UpdateMatchUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = updateMatchSchema.parse(req.body);

      const newMatch = await this.updateMatchUseCase.execute(validatedData);

      return res.status(201).json(newMatch);
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

export { UpdateMatchController };
