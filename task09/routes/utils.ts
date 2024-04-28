import { NextFunction, Request, Response } from 'express';

export const excludeFromTokenCheck = function (
  path: string,
  middleware: (req: Request, res: Response, next: NextFunction) => void
) {
  const regex = new RegExp(`^${path}(\/|$)`);

  return function (req: Request, res: Response, next: NextFunction) {
    if (regex.test(req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};
