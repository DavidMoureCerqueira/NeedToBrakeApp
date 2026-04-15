import { User } from '../interfaces/user';
import { UserForDataBase } from '../interfaces/user.for.database';
import { UserFromDataBase } from '../interfaces/user.from.database';

export function mapUserDataBaseToUser(user: UserFromDataBase): User {
  return {
    username: user.user_name,
    email: user.email,
    id: user.id,
    isAdmin: user.isAdmin,
  };
}
