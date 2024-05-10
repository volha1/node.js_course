import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import UserEntity from '../../entity/user.entity';

export const UsersFactory = setSeederFactory(UserEntity, (faker: Faker) => {
  const user = new UserEntity();
  user.login = 'admin';
  return user;
});
