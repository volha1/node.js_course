import UserEntity from './entity/user.entity';
import dataSource from './datasource/dataSource';

const userRepository = dataSource.getRepository(UserEntity);

export const getOne = async (login: string) =>
  await userRepository.findOneBy({ login: login });
