import User from './models/userModel';
import { UserEntity } from '../entity/user.entity';

export const getOne = async (email: string) => await User.findOne({ email });

export const create = async (user: Omit<UserEntity, 'id'>) =>
  await User.create(user);
