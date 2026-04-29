import { User } from '../users/user';

export interface SessionData {
  token: string;
  user: User;
}
