import { AuthForm } from '../interfaces/auth/authForm';
import { UserForDataBase } from '../interfaces/database.request/user.for.database';

export function mapUserToUserDatabase(user: AuthForm): UserForDataBase {
  return {
    username: user.username,
    email: user.email,
    password: user.password,
  };
}
