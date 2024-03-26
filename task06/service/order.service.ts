import { OrderEntity } from '../entity/order.entity';
import { create } from '../repository/order.repository';

export const createUserOrder = (order: OrderEntity) => {
  return create(order);
};
