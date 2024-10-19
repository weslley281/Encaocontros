import { Router, Request, Response, NextFunction } from 'express';
import { createUserController } from '../controllers/User/CreateUser';
import { getUserByIDController } from '../controllers/User/GetUserByID';

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

userRoutes.get(
  '/:user_id',
  asyncHandler((req: Request, res: Response) =>
    getUserByIDController.handle(req, res)
  )
);

export { userRoutes };
