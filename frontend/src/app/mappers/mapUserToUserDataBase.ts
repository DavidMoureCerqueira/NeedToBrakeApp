import { AuthForm } from '../interfaces/auth/authForm';
import { UserForDatabase } from '../interfaces/database.request/user.for.database';

export function mapUserToUserDatabase(user: AuthForm): UserForDatabase {
  return {
    username: user.username,
    email: user.email,
    password: user.password,
  };
}
