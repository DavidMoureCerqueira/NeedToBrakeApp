import { ProfileFromDataBase } from './profileFromDataBase';
import { UserFromDataBase } from './user.from.database';
// TODO Fix genericos
export interface ModelResp {
  success: boolean;
  data?: DataResp;
  error?: string;
}
interface DataResp {
  token: string;
  user: UserFromDataBase;
}

export interface UserResp {
  success: boolean;
  data?: ProfileFromDataBase;
  error?: string;
}
