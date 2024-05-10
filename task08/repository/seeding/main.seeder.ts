import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import UserEntity from '../entity/user.entity';
import ProductEntity from '../entity/product.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(UserEntity);
    const productFactory = factoryManager.get(ProductEntity);

    const users = await userFactory.saveMany(1);
    const products = await productFactory.saveMany(1);
  }
}
