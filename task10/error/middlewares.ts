import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError';
import { HttpStatusCode } from './statusCode';
import logger from '../logger/logger';

export const handleErrorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({
      data: null,
      error: err.message,
    });
  }

  logger.error(err);
  res.status(HttpStatusCode.INTERNAL_SERVER).send({
    data: null,
    error: err,
  });
};
