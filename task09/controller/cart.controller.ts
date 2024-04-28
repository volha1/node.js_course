import { NextFunction, Request, Response } from 'express';
import {
  fetchCartByUser,
  deleteCart,
  updateCartByUser,
  findCartByUser,
} from '../service/cart.service';
import { cartSchema } from './validationSchema/cart.schema';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const getCartByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = res.locals.user.email;
    const cartWithTotalPrice = await fetchCartByUser(email);

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
    const email = res.locals.user.email;
    const cart = await findCartByUser(email);

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
    const { value, error } = cartSchema.validate(req.body);

    if (error) {
      return next(
        new AppError('Products are not valid', HttpStatusCode.BAD_REQUEST)
      );
    }

    const cartWithTotalPrice = await updateCartByUser(req.body);

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
