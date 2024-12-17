import { Request, Response } from 'express';
import { z } from 'zod';
import { GetPetByIDUseCase } from 'src/usecases/Pet/GetByIDUseCase';

// Esquema de validação do Zod
const getPetByIDControllerSchema = z.object({
  pet_id: z.number().int(),
});

class GetPetByIDController {
  constructor(private getPetByIDUseCase: GetPetByIDUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = getPetByIDControllerSchema.parse({
        pet_id: req.params.pet_id,
      });

      const pet = await this.getPetByIDUseCase.execute(validatedData);

      return res.status(200).json(pet);
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

export { GetPetByIDController };
