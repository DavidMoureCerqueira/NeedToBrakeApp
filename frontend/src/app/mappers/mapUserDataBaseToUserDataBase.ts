import { User } from '../interfaces/users/user';
import { UserFromDataBase } from '../interfaces/database.responses/user.from.database';

export function mapUserDatabaseToUser(user: UserFromDataBase): User {
  return {
    username: user.username,
    email: user.email,
    id: user.id,
    isAdmin: user.is_admin,
  };
}
