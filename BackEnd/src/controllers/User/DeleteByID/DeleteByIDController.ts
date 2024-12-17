import { Request, Response } from 'express';
import { z } from 'zod';
import { DeleteUserByIDUseCase } from 'src/usecases/User/DeleteByIDUseCase';

// Esquema de validação do Zod
const deleteUserByIDControllerSchema = z.object({
  user_id: z.number().int(),
});

class DeleteUserByIDController {
  constructor(private deleteUserByIDUseCase: DeleteUserByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = deleteUserByIDControllerSchema.parse({
        user_id: req.params.user_id,
      });

      const isDeleted = await this.deleteUserByIDUseCase.execute(validatedData);

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

export { DeleteUserByIDController };
