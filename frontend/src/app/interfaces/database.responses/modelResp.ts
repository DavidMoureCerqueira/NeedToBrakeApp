import { UserFromDataBase } from './user.from.database';

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
  data?: UserFromDataBase;
  error?: string;
}
