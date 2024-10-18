import { Router, Request, Response, NextFunction } from 'express';
import { createUserController } from '../controllers/User/CreateUser';

const userRoutes = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

userRoutes.post(
  '/',
  asyncHandler((req: Request, res: Response) =>
    createUserController.handle(req, res)
  )
);

export { userRoutes };
