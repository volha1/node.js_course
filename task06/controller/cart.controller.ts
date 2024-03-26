import { Request, Response } from 'express';
import {
  fetchCartByUserId,
  deleteCartByUserId,
  updateCartByUserId,
  findCartByUserId,
} from '../service/cart.service';
import { cartSchema } from './schemas/cart.schema';
import { AppError } from '../errors/appError';
import { HttpStatusCode } from '../errors/statusCode';

export const getCartByUserId = (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const cartWithTotalPrice = fetchCartByUserId(userId);

  res.send({
    data: {
      cart: {
        id: cartWithTotalPrice.cart.id,
        items: cartWithTotalPrice.cart.items,
      },
      total: cartWithTotalPrice.totalPrice,
    },
    error: null,
  });
};

export const removeCart = (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const cart = findCartByUserId(userId);

  if (!cart) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Cart was not found', true);
  }

  deleteCartByUserId(userId);

  res.send({
    data: {
      success: true,
    },
    error: null,
  });
};

export const updateCart = (req: Request, res: Response) => {
  const userId = res.locals.userId;

  const { value, error } = cartSchema.validate(req.body);

  if (error) {
    throw new AppError(
      HttpStatusCode.BAD_REQUEST,
      'Products are not valid',
      true
    );
  }

  const cartWithTotalPrice = updateCartByUserId(userId, req.body);

  if (!cartWithTotalPrice) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Cart was not found', true);
  } else {
    res.send({
      data: {
        cart: {
          id: cartWithTotalPrice.cart.id,
          items: cartWithTotalPrice.cart.items,
        },
        total: cartWithTotalPrice.totalPrice,
      },
      error: null,
    });
  }
};
