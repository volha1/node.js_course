import { NextFunction, Request, Response } from 'express';
import { fetchUser } from '../service/user.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const authenticateUserMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const login = req.headers['x-user-id']?.toString();

    if (!login) {
      return next(
        new AppError(
          'You must be an authorized user',
          HttpStatusCode.UNAUTHORIZED
        )
      );
    }

    const user = await fetchUser(login);

    if (!user) {
      return next(
        new AppError('User is not an authorized user', HttpStatusCode.FORBIDDEN)
      );
    }

    res.locals.user = user;

    next();
  }
);
