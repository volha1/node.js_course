import {
  getOneByUserId,
  create,
  removeOne,
  update,
} from '../repository/cart.repository';
import CartEntity from '../repository/entity/cart.entity';
import CartItemEntity from '../repository/entity/cartItem.entity';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import UserEntity from '../repository/entity/user.entity';

const calculateTotalPrice = (cartItems: Array<CartItemEntity>) => {
  return cartItems.reduce(
    (counter, item) => counter + item.count * item.product.price,
    0
  );
};

const createEmptyCart = async (user: UserEntity) => {
  const emptyCart = new CartEntity();
  emptyCart.user = user;

  return await create(emptyCart);
};

export const fetchCartByUserId = async (user: UserEntity) => {
  let cart = await getOneByUserId(user.id);

  if (!cart) {
    cart = await createEmptyCart(user);
  }

  const totalPrice = calculateTotalPrice(cart.items);
  return { cart: cart, totalPrice: totalPrice };
};

export const findCartByUserId = async (userId: string) =>
  await getOneByUserId(userId);

export const deleteCart = async (cart: CartEntity) => await removeOne(cart);

export const updateCartByUserId = async (cart: CartEntity) => {
  console.log(cart.items);
  const cartUpdated = await update(cart);

  if (!cartUpdated) {
    throw new AppError('Cart was not found', HttpStatusCode.NOT_FOUND);
  }

  const totalPrice = calculateTotalPrice(cartUpdated.items);
  return { cart: cartUpdated, totalPrice: totalPrice };
};
