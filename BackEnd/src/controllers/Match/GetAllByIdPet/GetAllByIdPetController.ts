import { Request, Response } from 'express';
import { z } from 'zod';
import { GetAllByIdPetUseCase } from '../../../usecases/Match/GetAllByIdPetUseCase';

// Esquema de validação do Zod
const getAllMatchByIdPetControllerSchema = z.object({
  pet_id: z.number().int(),
});

export class GetAllByIdPetController {
  constructor(private getAllByIdPetUseCase: GetAllByIdPetUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getAllMatchByIdPetControllerSchema.parse({
        name: req.params.name,
      });

      const matchs = await this.getAllByIdPetUseCase.execute(validatedData);

      return res.status(200).json(matchs);
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
