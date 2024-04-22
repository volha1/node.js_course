import { Order } from '../entity/order.entity';
import { create } from '../repository/order.repository';
import { findCartByUserId } from './cart.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import UserEntity from '../repository/entity/user.entity';
import OrderEntity from '../repository/entity/order.entity';

export const createUserOrder = async (user: UserEntity, order: Order) => {
  const cart = await findCartByUserId(user.id);

  if (!cart) {
    throw new AppError('Cart was not found', HttpStatusCode.NOT_FOUND);
  }

  const newOrder = new OrderEntity();
  newOrder.user = user;
  newOrder.cart = cart;
  newOrder.paymentType = order.payment.type;
  newOrder.address = order.payment.address;
  newOrder.creditCard = order.payment.creditCard;
  newOrder.comments = order.comments;
  newOrder.total = order.total;

  return await create(newOrder);
};
