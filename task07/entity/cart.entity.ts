import { ProductEntity } from './product.entity';

type UUID = string;

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: UUID;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}
