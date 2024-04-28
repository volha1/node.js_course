import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

export const verifyTokenMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(
        new AppError('Token is required', HttpStatusCode.UNAUTHORIZED)
      );
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
      return next(new AppError('Invalid token', HttpStatusCode.FORBIDDEN));
    }

    try {
      const user = jwt.verify(token, process.env.TOKEN_KEY!);
      res.locals.user = user;
    } catch (err) {
      return next(new AppError('Invalid token', HttpStatusCode.UNAUTHORIZED));
    }

    next();
  }
);

export const isAdminMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (user.role !== 'admin') {
      return next(
        new AppError(
          'Only admins can delete carts',
          HttpStatusCode.UNAUTHORIZED
        )
      );
    }

    next();
  }
);
