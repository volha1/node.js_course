import { CartItemEntity } from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';
type UUID = string;

export interface OrderEntity {
  id: UUID;
  email: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
