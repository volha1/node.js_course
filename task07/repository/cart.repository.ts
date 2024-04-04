import { CartEntity } from '../entity/cart.entity';
import Cart from './models/cartModel';

export const getOneByUserId = async (userId: string) =>
  await Cart.findOne({ userId: userId });

export const create = async (cart: Omit<CartEntity, 'id'>) =>
  await Cart.create(cart);

export const removeOne = async (id: string) => await Cart.findByIdAndDelete(id);

export const update = async (cart: CartEntity) =>
  await Cart.findByIdAndUpdate(cart.id, cart, {
    new: true,
  });
