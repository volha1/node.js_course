import { getAll, getOne } from '../repository/product.repository';

export const fetchProducts = () => {
  return getAll();
};

export const fetchProduct = (id: string) => {
  return getOne(id);
};
