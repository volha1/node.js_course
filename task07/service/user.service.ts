import { getOne } from '../repository/user.repository';

export const fetchUser = async (login: string) => {
  return await getOne(login);
};
