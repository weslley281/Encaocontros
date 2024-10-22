import { Router, Request, Response, NextFunction } from 'express';
import { createPetController } from '../controllers/Pet/Create';
import { getPetByIDController } from '../controllers/Pet/GetByID';
import { updatePetController } from '../controllers/Pet/Update';
import { updatePetPhotoController } from '../controllers/Pet/UpdatePhoto';
import { getAllPetByNameController } from '../controllers/Pet/GetAllByName';

const petRoutes = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

petRoutes.post(
  '/',
  asyncHandler((req: Request, res: Response) =>
    createPetController.handle(req, res)
  )
);

petRoutes.put(
  '/',
  asyncHandler((req: Request, res: Response) =>
    updatePetController.handle(req, res)
  )
);

petRoutes.patch(
  '/photo/:pet_id',
  asyncHandler((req: Request, res: Response) =>
    updatePetPhotoController.handle(req, res)
  )
);

petRoutes.get(
  '/id/:pet_id',
  asyncHandler((req: Request, res: Response) =>
    getPetByIDController.handle(req, res)
  )
);

petRoutes.get(
  '/name/:name',
  asyncHandler((req: Request, res: Response) =>
    getAllPetByNameController.handle(req, res)
  )
);

export { petRoutes };
