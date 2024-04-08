import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError';
import { HttpStatusCode } from './statusCode';

export const handleErrorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      data: null,
      error: err.message,
    });
  } else {
    res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .send({ error: 'Internal server error' });
  }
};
