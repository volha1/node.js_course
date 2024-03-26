import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/appError';
import { HttpStatusCode } from '../errors/statusCode';

export const handleError = (
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
