import { NextFunction, Request, Response } from 'express';
import {
  fetchCartByUserId,
  deleteCart,
  updateCartByUserId,
  findCartByUserId,
} from '../service/cart.service';
import { cartSchema } from './validationSchema/cart.schema';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const getCartByUserId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const cartWithTotalPrice = await fetchCartByUserId(userId);

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
);

export const removeCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const cart = await findCartByUserId(userId);

    if (!cart) {
      return next(new AppError('Cart was not found', HttpStatusCode.NOT_FOUND));
    }

    await deleteCart(cart.id);

    res.send({
      data: {
        success: true,
      },
      error: null,
    });
  }
);

export const updateCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;

    const { value, error } = cartSchema.validate(req.body);

    if (error) {
      return next(
        new AppError('Products are not valid', HttpStatusCode.BAD_REQUEST)
      );
    }

    const cartWithTotalPrice = await updateCartByUserId(userId, req.body);

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
);
