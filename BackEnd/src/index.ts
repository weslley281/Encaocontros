import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno!' });
});

export { app };
