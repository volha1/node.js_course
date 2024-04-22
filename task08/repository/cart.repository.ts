import CartEntity from './entity/cart.entity';
import dataSource from './datasource/dataSource';

const cartRepository = dataSource.getRepository(CartEntity);

export const getOneByUserId = async (userId: string) => {
  return await cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['items', 'items.product'],
  });
};

export const create = async (cart: CartEntity) =>
  await cartRepository.save(cart);

export const removeOne = async (cart: CartEntity) => await cart.remove();

export const update = async (cart: CartEntity) => {
  return await cartRepository.save(cart);
};
