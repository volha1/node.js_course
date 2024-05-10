import ProductEntity from './entity/product.entity';
import dataSource from './datasource/dataSource';

const productRepository = dataSource.getRepository(ProductEntity);
export const getAll = async () => {
  return await productRepository.find();
};

export const getOne = async (id: string) =>
  await productRepository.findOneBy({ id: id });
