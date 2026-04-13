import { User } from './user';

export interface ModelRespAuth {
  success: boolean;
  data?: DataResp;
  error?: string;
}
interface DataResp {
  token: string;
  user: User;
}
