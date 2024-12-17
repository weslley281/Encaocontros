import { Request, Response } from 'express';
import { z } from 'zod';
import { GetMatchByIDUseCase } from 'src/usecases/Match/GetByIDUseCase';

// Esquema de validação do Zod
const getMatchByIDControllerSchema = z.object({
  match_id: z.number().int(),
});

class GetMatchByIDController {
  constructor(private getMatchByIDUseCase: GetMatchByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getMatchByIDControllerSchema.parse({
        match_id: req.params.match_id,
      });

      const match = await this.getMatchByIDUseCase.execute(validatedData);

      return res.status(200).json(match);
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

export { GetMatchByIDController };
