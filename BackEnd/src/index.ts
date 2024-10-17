import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(express.json());

// Usando as rotas de usuário
app.use('/api', userRoutes);

// Middleware de erro global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Loga o erro no console
  res.status(500).json({ message: 'Ocorreu um erro interno!' });
});

export { app };
