import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { createConnectionDataBase } from './config/database';
import { createTableUser } from './database/userModel';
import { createTablePets } from './database/petModel';
import dotenv from 'dotenv';

dotenv.config();

createConnectionDataBase();
createTableUser();
createTablePets();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/users', userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno do servidor!' });
});

export { app };
