import { getOne } from '../repository/user.repository';

export const fetchUser = (id: string) => {
  return getOne(id);
};
