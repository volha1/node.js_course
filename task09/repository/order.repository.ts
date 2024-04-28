import { OrderEntity } from '../entity/order.entity';
import Order from './models/orderModel';

export const create = async (order: Omit<OrderEntity, 'id'>) => {
  return await Order.create(order);
};
