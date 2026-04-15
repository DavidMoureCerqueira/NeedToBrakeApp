import { UserFromDataBase } from './user.from.database';

export interface ModelRespAuth {
  success: boolean;
  data?: DataResp;
  error?: string;
}
export interface DataResp {
  token: string;
  user: UserFromDataBase;
}
