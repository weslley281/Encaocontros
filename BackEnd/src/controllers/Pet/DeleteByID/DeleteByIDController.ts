import { Request, Response } from 'express';
import { z } from 'zod';
import { DeletePetByIDUseCase } from 'src/usecases/Pet/DeleteByIDUseCase';

// Esquema de validação do Zod
const deletePetByIDControllerSchema = z.object({
  pet_id: z.number().int(),
});

class DeletePetByIDController {
  constructor(private deletePetByIDUseCase: DeletePetByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = deletePetByIDControllerSchema.parse({
        pet_id: req.params.pet_id,
      });

      const isDeleted = await this.deletePetByIDUseCase.execute(validatedData);

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

export { DeletePetByIDController };
