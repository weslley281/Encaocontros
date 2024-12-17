import { Request, Response } from 'express';
import { z } from 'zod';
import { DeleteMatchByIDUseCase } from 'src/usecases/Match/DeleteByIDUseCase';

// Esquema de validação do Zod
const deleteMatchByIDControllerSchema = z.object({
  match_id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'ID inválido' }),
});

class DeleteMatchByIDController {
  constructor(private deleteMatchByIDUseCase: DeleteMatchByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = deleteMatchByIDControllerSchema.parse({
        match_id: req.params.match_id,
      });

      const isDeleted = await this.deleteMatchByIDUseCase.execute(validatedData);

      return res.status(204).json(isDeleted);
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

export { DeleteMatchByIDController };
