import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import swaggerFile from './swagger.json';

import { createConnectionDataBase } from './config/database';

import { userRoutes } from './routes/userRoutes';
import { petRoutes } from './routes/petRoutes';

import { createTableUser } from './database/userModel';
import { createTablePets } from './database/petModel';
import { createTableAdvertisements } from './database/advertisementModel';
import { createTableFavorites } from './database/favoriteModel';
import { createTableMatches } from './database/matchModel';
import { createTableMessages } from './database/messageModel';
import { createTableNotifications } from './database/notificationModel';
import { createTableSubscriptions } from './database/subscriptionModel';
import { matchRoutes } from './routes/matchRoutes';


dotenv.config();

createConnectionDataBase();
createTableUser();
createTablePets();
createTableAdvertisements();
createTableFavorites();
createTableMatches();
createTableMessages();
createTableNotifications();
createTableSubscriptions();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/matches', matchRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno do servidor!' });
});

export { app };
