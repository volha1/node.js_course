import bcrypt from 'bcryptjs';
import { getOne, create } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';

export const fetchUser = async (email: string) => {
  return await getOne(email);
};

export const createUser = async (user: Omit<UserEntity, 'id'>) => {
  const { email, password, role } = user;
  const encryptedPassword = await bcrypt.hash(password, 10);

  return await create({
    email,
    password: encryptedPassword,
    role: role,
  });
};
