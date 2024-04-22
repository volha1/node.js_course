import { ProductEntity } from './product.entity';

export interface CartItem {
  product: ProductEntity;
  count: number;
}
