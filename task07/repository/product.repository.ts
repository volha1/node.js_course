import Product from './models/productModel';

export const getAll = async () => await Product.find();

export const getOne = async (id: string) => await Product.findById(id);
