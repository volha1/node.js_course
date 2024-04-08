import { Request, Response } from 'express';
import { orderSchema } from './schemas/order.schema';
import { createUserOrder } from '../service/order.service';
import { AppError } from '../errors/appError';
import { HttpStatusCode } from '../errors/statusCode';

export const createOrder = (req: Request, res: Response) => {
  const { value, error } = orderSchema.validate(req.body);

  if (error) {
    throw new AppError(HttpStatusCode.BAD_REQUEST, 'Cart is empty', true);
  }

  const order = createUserOrder(req.body);

  res.send({
    data: {
      order: order,
      error: null,
    },
  });
};
