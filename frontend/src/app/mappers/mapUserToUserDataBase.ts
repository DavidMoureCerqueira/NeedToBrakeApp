import { AuthForm } from '../interfaces/auth/authForm';
import { UserForDataBase } from '../interfaces/database.request/user.for.database';

export function mapUserToUserDataBase(user: AuthForm): UserForDataBase {
  return {
    username: user.userName,
    email: user.email,
    password: user.password,
  };
}
