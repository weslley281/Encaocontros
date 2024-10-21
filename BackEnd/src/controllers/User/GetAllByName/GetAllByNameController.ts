import { Request, Response } from 'express';
import { z } from 'zod';
import { GetAllUserByNameUseCase } from '../../../usecases/User/GetAllByNameUseCase';

// Esquema de validação do Zod
const getAllUserByNameControllerSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
});

export class GetAllUserByNameController {
  constructor(private getAllUserByNameUseCase: GetAllUserByNameUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getAllUserByNameControllerSchema.parse({
        name: req.params.name,
      });

      const users = await this.getAllUserByNameUseCase.execute(validatedData);

      return res.status(200).json(users);
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
