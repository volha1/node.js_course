import {
  getOneByUserId,
  create,
  removeOne,
  update,
} from '../repository/cart.repository';
import { CartEntity, CartItemEntity } from '../entity/cart.entity';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';

const calculateTotalPrice = (cartItems: Array<CartItemEntity>) => {
  return cartItems.reduce(
    (counter, item) => counter + item.count * item.product.price,
    0
  );
};

const createEmptyCart = async (userId: string) => {
  const emptyCart = {
    userId: userId,
    isDeleted: false,
    items: [],
  };

  return await create(emptyCart);
};

export const fetchCartByUserId = async (userId: string) => {
  let cart = await getOneByUserId(userId);

  if (!cart) {
    cart = await createEmptyCart(userId);
  }

  const totalPrice = calculateTotalPrice(cart.items);
  return { cart: cart, totalPrice: totalPrice };
};

export const findCartByUserId = async (userId: string) =>
  await getOneByUserId(userId);

export const deleteCart = async (id: string) => await removeOne(id);

export const updateCartByUserId = async (userId: string, cart: CartEntity) => {
  const cartUpdated = await update(cart);
  if (!cartUpdated) {
    throw new AppError('Cart was not found', HttpStatusCode.NOT_FOUND);
  }

  const totalPrice = calculateTotalPrice(cartUpdated.items);
  return { cart: cartUpdated, totalPrice: totalPrice };
};
