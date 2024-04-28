import { NextFunction, Request, Response } from 'express';
import { fetchUser } from '../service/user.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const authenticateUserMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id']?.toString();

    if (!userId) {
      return next(
        new AppError(
          'You must be an authorized user',
          HttpStatusCode.UNAUTHORIZED
        )
      );
    }

    const user = await fetchUser(userId);

    if (!user) {
      return next(
        new AppError('User is not an authorized user', HttpStatusCode.FORBIDDEN)
      );
    }

    res.locals.userId = userId;

    next();
  }
);
