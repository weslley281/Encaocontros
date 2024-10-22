import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdatePetPhotoUseCase } from '../../../usecases/Pet/UpdatePhotoUseCase';
import { upload } from '../../../config/multer';

const updatePetPhotoSchema = z.object({
  pet_id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'ID inválido' }),
});

class UpdatePetPhotoController {
  constructor(private updatePetPhotoUseCase: UpdatePetPhotoUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {

      upload.single('photo')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Erro ao fazer upload da foto' });
        }

        const { pet_id } = req.params;
        const validatedData = updatePetPhotoSchema.parse(req.body);
        const photoPath = req.file?.path;

        if (!photoPath) {
          return res.status(400).json({ message: 'Nenhuma foto enviada' });
        }

        // Passa o caminho da foto para o use case
        const updatedPet = await this.updatePetPhotoUseCase.execute(validatedData, photoPath);

        return res.status(200).json(updatedPet);
      });
      
      return res.status(400).json({ message: "Erro ao enviar foto" });

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

export { UpdatePetPhotoController };
