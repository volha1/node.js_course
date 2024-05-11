import { CartEntity } from '../entity/cart.entity';
import Cart from './models/cartModel';

export const getOneByUser = async (email: string) =>
  await Cart.findOne({ email });

export const create = async (cart: Omit<CartEntity, 'id'>) =>
  await Cart.create(cart);

export const removeOne = async (id: string) => await Cart.findByIdAndDelete(id);

export const update = async (cart: CartEntity) =>
  await Cart.findByIdAndUpdate(cart.id, cart, {
    new: true,
  });
