type UserRole = 'admin' | 'user';

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}
