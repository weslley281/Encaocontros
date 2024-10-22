import { Request, Response } from 'express';
import { z } from 'zod';
import { GetUserByIDUseCase } from 'src/usecases/User/GetByIDUseCase';

// Esquema de validação do Zod
const getUserByIDControllerSchema = z.object({
  user_id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'ID inválido' }),
});

class GetUserByIDController {
  constructor(private getUserByIDUseCase: GetUserByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getUserByIDControllerSchema.parse({
        user_id: req.params.user_id,
      });

      const user = await this.getUserByIDUseCase.execute(validatedData);

      return res.status(200).json(user);
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

export { GetUserByIDController };
