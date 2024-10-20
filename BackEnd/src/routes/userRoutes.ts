import { Router, Request, Response, NextFunction } from 'express';
import { createUserController } from '../controllers/User/Create';
import { getUserByIDController } from '../controllers/User/GetByID';
import { authenticateUserController } from '../controllers/User/Authenticate';

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

userRoutes.post(
  '/auth',
  asyncHandler((req: Request, res: Response) =>
    authenticateUserController.handle(req, res)
  )
);

userRoutes.get(
  '/id/:user_id',
  asyncHandler((req: Request, res: Response) =>
    getUserByIDController.handle(req, res)
  )
);

userRoutes.get(
  '/name/:name',
  asyncHandler((req: Request, res: Response) =>
    getUserByIDController.handle(req, res)
  )
);

export { userRoutes };
