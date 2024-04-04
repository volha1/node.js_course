import { getAll, getOne } from '../repository/product.repository';

export const fetchProducts = async () => await getAll();

export const fetchProduct = async (id: string) => await getOne(id);
