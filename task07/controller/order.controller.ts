import { NextFunction, Request, Response } from 'express';
import { orderSchema } from './validationSchema/order.schema';
import { createUserOrder } from '../service/order.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const { value, error } = orderSchema.validate(req.body);

    if (error) {
      return next(
        new AppError('Order is incorrect', HttpStatusCode.BAD_REQUEST)
      );
    }

    const order = await createUserOrder(userId, req.body);

    res.send({
      data: {
        order: order,
        error: null,
      },
    });
  }
);
