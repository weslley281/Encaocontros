import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from '../usecases/CreateUser/CreateUserUseCase'; // Corrigido o caminho da importação

// Esquema de validação do Zod
const createClientSchema = z.object({
  user_type: z.string().min(1, { message: 'O tipo do usuário é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone deve ter mais de 10 caracteres' }),
  email: z.string().email({ message: 'Formato do email é inválido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter mais de 11 dígitos' }),
  birthday: z.coerce.date({ message: 'Formato de data inválido' }), // Zod converte para objeto Date
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      // Valida os dados do corpo da requisição
      const validatedData = createClientSchema.parse(req.body);

      const createUserUseCase = new CreateUserUseCase();

      // Cria o usuário
      const newUser = await createUserUseCase.execute(validatedData);

      return res.status(201).json(newUser); // Respondendo com o usuário criado
    } catch (error: any) {
      // Verifica se o erro foi gerado pelo Zod
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.errors, // Retorna os detalhes dos erros de validação
        });
      }

      // Caso o erro não seja do Zod, retorne o erro genérico
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreateUserController };
