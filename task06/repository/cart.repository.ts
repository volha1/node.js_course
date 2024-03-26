import { v4 as uuidv4 } from 'uuid';
import { CartEntity } from '../entity/cart.entity';

let carts: Array<CartEntity> = [
  {
    id: 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66c',
    userId: 'admin',
    isDeleted: false,
    items: [
      {
        product: {
          id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
          title: 'Book',
          description: 'Interesting book',
          price: 200,
        },
        count: 2,
      },
    ],
  },
];

export const getOneByUserId = (userId: string) => {
  const cartsFound = carts.filter((cart) => cart.userId === userId);
  return cartsFound.length === 0 ? null : cartsFound[0];
};

export const create = (cart: Omit<CartEntity, 'id'>) => {
  const newCart = { id: uuidv4(), ...cart };
  carts.push(newCart);
  return newCart;
};

export const removeByUserId = (userId: string) => {
  carts = carts.filter((cart) => cart.userId !== userId);
};

export const update = (cart: CartEntity) => {
  const index = carts.findIndex((item) => (item.id = cart.id));
  carts[index] = cart;
  return cart;
};
