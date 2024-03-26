import { NextFunction, Request, Response } from 'express';
import { fetchUser } from '../service/user.service';
import { AppError } from '../errors/appError';
import { HttpStatusCode } from '../errors/statusCode';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id']?.toString();

  if (!userId) {
    throw new AppError(
      HttpStatusCode.UNAUTHORIZED,
      'You must be an authorized user',
      true
    );
  }

  const user = fetchUser(userId);

  if (!user) {
    throw new AppError(
      HttpStatusCode.FORBIDDEN,
      'User is not an authorized user',
      true
    );
  }

  res.locals.userId = userId;

  next();
};
