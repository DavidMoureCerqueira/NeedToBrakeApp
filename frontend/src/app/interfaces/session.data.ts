import { User } from './user';

export interface SessionData {
  token: string;
  user: User;
}
