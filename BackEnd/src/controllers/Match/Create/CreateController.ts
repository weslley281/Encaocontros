import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateMatchUseCase } from '../../../usecases/Match/CreateUseCase';

const createMatchSchema = z.object({
  user1_id: z.number().int(),
  user2_id: z.number().int(),
  pet1_id: z.number().int(),
  pet2_id: z.number().int(),
  status: z.string().min(1, { message: 'O status é obrigatório' }),
});

class CreateMatchController {
  constructor(private createMatchUseCase: CreateMatchUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = createMatchSchema.parse(req.body);

      const newMatch = await this.createMatchUseCase.execute(validatedData);

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

export { CreateMatchController };
