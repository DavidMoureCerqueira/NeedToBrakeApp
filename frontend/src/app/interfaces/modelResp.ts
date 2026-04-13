export interface ModelRespAuth {
  success: boolean;
  data?: DataResp;
  error?: string;
}
interface DataResp {
  token: string;
  user: User;
}

interface User {
  id: number;
  email: string;
}
