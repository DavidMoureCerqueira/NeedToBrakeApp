import { User } from '../interfaces/users/user';
import { UserForDataBase } from '../interfaces/database.request/user.for.database';
import { UserFromDataBase } from '../interfaces/database.responses/user.from.database';

export function mapUserDataBaseToUser(user: UserFromDataBase): User {
  return {
    username: user.user_name,
    email: user.email,
    id: user.id,
    isAdmin: user.is_admin,
  };
}
