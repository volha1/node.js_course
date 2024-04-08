import { UserEntity } from '../entity/user.entity';

const users: Array<UserEntity> = [
  {
    id: 'admin',
  },
];

export const getOne = (id: string) => {
  const usersFound = users.filter((user) => user.id === id);
  return usersFound[0];
};
