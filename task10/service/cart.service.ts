import {
  getOneByUser,
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

const createEmptyCart = async (email: string) => {
  const emptyCart = {
    email: email,
    isDeleted: false,
    items: [],
  };

  return await create(emptyCart);
};

export const fetchCartByUser = async (email: string) => {
  let cart = await getOneByUser(email);

  if (!cart) {
    cart = await createEmptyCart(email);
  }

  const totalPrice = calculateTotalPrice(cart.items);
  return { cart: cart, totalPrice: totalPrice };
};

export const findCartByUser = async (email: string) =>
  await getOneByUser(email);

export const deleteCart = async (id: string) => await removeOne(id);

export const updateCartByUser = async (cart: CartEntity) => {
  const cartUpdated = await update(cart);
  if (!cartUpdated) {
    throw new AppError('Cart was not found', HttpStatusCode.NOT_FOUND);
  }

  const totalPrice = calculateTotalPrice(cartUpdated.items);
  return { cart: cartUpdated, totalPrice: totalPrice };
};
