import { AuthForm } from '../interfaces/authForm';
import { UserForDataBase } from '../interfaces/user.for.database';

export function mapUserToUserDataBase(user: AuthForm): UserForDataBase {
  return {
    user_name: user.userName,
    email: user.email,
    password: user.password,
  };
}
