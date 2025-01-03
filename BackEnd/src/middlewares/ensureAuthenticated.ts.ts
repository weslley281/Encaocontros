import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppErros';
import { UserRepository } from '../repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token missing', 401);

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_SECRET || ''
    ) as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(Number(user_id));

    if (!user) throw new AppError('User does not exists', 401);

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
