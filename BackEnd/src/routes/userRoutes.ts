import { Router, Request, Response, NextFunction } from 'express';
import { CreateUserController } from '../controllers/User/CreateUserController';

const userRoutes = Router();
const createUserController = new CreateUserController();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

userRoutes.post('/users', asyncHandler((req: Request, res: Response) => createUserController.handle(req, res)));

export { userRoutes };
