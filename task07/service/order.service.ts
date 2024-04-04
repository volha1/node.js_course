import { OrderEntity } from '../entity/order.entity';
import { create } from '../repository/order.repository';
import { findCartByUserId } from './cart.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';

export const createUserOrder = async (userId: string, order: OrderEntity) => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new AppError('Cart was not found', HttpStatusCode.NOT_FOUND);
  }

  return await create(order);
};
