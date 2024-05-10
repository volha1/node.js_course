import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import ProductEntity from '../../entity/product.entity';

export const ProductFactory = setSeederFactory(
  ProductEntity,
  (faker: Faker) => {
    const product = new ProductEntity();
    product.title = faker.lorem.word();
    product.description = faker.lorem.text();
    product.price = faker.number.int(100);
    return product;
  }
);
