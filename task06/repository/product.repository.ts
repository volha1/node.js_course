import { ProductEntity } from '../entity/product.entity';

const products: Array<ProductEntity> = [
  {
    id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
    title: 'Book',
    description: 'Interesting book',
    price: 200,
  },
];

export const getAll = () => {
  return products;
};

export const getOne = (id: string) => {
  const productsFound = products.filter((product) => product.id === id);
  return productsFound.length === 0 ? null : productsFound[0];
};
