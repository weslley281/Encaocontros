import { Request, Response } from 'express';
import { z } from 'zod';
import { GetAllPetByNameUseCase } from '../../../usecases/Pet/GetAllByNameUseCase';

// Esquema de validação do Zod
const getAllPetByNameControllerSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
});

export class GetAllPetByNameController {
  constructor(private getAllPetByNameUseCase: GetAllPetByNameUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getAllPetByNameControllerSchema.parse({
        name: req.params.name,
      });

      const pets = await this.getAllPetByNameUseCase.execute(validatedData);

      return res.status(200).json(pets);
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
