import { AuthForm } from '../interfaces/authForm';
import { UserDataBase } from '../interfaces/user.database';

export function mapUserToUserDataBase(user: AuthForm): UserDataBase {
  return {
    user_name: user.userName,
    email: user.email,
    password: user.password,
  };
}
