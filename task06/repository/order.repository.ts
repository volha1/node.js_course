import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../entity/order.entity';

const orders: Array<OrderEntity> = [];

export const create = (order: Omit<OrderEntity, 'id'>) => {
  const newOrder = { id: uuidv4(), ...order };
  orders.push(newOrder);
  return newOrder;
};
