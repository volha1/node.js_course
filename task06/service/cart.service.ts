import {
  getOneByUserId,
  create,
  removeByUserId,
  update,
} from '../repository/cart.repository';
import { CartEntity, CartItemEntity } from '../entity/cart.entity';

const calculateTotalPrice = (cartItems: Array<CartItemEntity>) => {
  return cartItems.reduce(
    (counter, item) => counter + item.count * item.product.price,
    0
  );
};

const createEmptyCart = (userId: string) => {
  const emptyCart = {
    userId: userId,
    isDeleted: false,
    items: [],
  };
  return create(emptyCart);
};

export const fetchCartByUserId = (userId: string) => {
  let cart = getOneByUserId(userId);

  if (!cart) {
    cart = createEmptyCart(userId);
  }

  const totalPrice = calculateTotalPrice(cart.items);
  return { cart: cart, totalPrice: totalPrice };
};

export const findCartByUserId = (userId: string) => {
  return getOneByUserId(userId);
};

export const deleteCartByUserId = (userId: string) => {
  removeByUserId(userId);
};

export const updateCartByUserId = (userId: string, cart: CartEntity) => {
  const cartFound = getOneByUserId(userId);

  if (!cartFound) {
    return null;
  }

  const cartUpdated = update(cart);

  const totalPrice = calculateTotalPrice(cartUpdated.items);
  return { cart: cartUpdated, totalPrice: totalPrice };
};
