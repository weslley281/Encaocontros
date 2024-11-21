import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateUserPhotoUseCase } from '../../../usecases/User/UpdatePhotoUseCase';
import { upload } from '../../../config/multer';

const updateUserPhotoSchema = z.object({
  user_id: z.number().int(),
});

class UpdateUserPhotoController {
  constructor(private updateUserPhotoUseCase: UpdateUserPhotoUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {

      upload.single('photo')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Erro ao fazer upload da foto' });
        }

        const { user_id } = req.params;
        const validatedData = updateUserPhotoSchema.parse(req.body);
        const photoPath = req.file?.path;

        if (!photoPath) {
          return res.status(400).json({ message: 'Nenhuma foto enviada' });
        }

        // Passa o caminho da foto para o use case
        const updatedUser = await this.updateUserPhotoUseCase.execute(validatedData, photoPath);

        return res.status(200).json(updatedUser);
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

export { UpdateUserPhotoController };
