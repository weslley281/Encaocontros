import { Router, Request, Response, NextFunction } from 'express';
import { createMatchController } from '../controllers/Match/Create';
import { getMatchByIDController } from '../controllers/Match/GetByID';
import { updateMatchController } from '../controllers/Match/Update';
import { getAllByIdPetController } from '../controllers/Match/GetAllByIdPet';

const matchRoutes = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

matchRoutes.post(
  '/',
  asyncHandler((req: Request, res: Response) =>
    createMatchController.handle(req, res)
  )
);

matchRoutes.put(
  '/',
  asyncHandler((req: Request, res: Response) =>
    updateMatchController.handle(req, res)
  )
);

matchRoutes.get(
  '/id/:match_id',
  asyncHandler((req: Request, res: Response) =>
    getMatchByIDController.handle(req, res)
  )
);

matchRoutes.get(
  '/name/:name',
  asyncHandler((req: Request, res: Response) =>
    getAllByIdPetController.handle(req, res)
  )
);

export { matchRoutes };
