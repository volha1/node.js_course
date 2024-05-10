import OrderEntity from './entity/order.entity';
import dataSource from './datasource/dataSource';

const orderRepository = dataSource.getRepository(OrderEntity);
export const create = async (order: OrderEntity) => {
  return orderRepository.save(order);
};
