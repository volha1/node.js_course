import User from './models/userModel';

export const getOne = async (login: string) =>
  await User.findOne({ login: login });
