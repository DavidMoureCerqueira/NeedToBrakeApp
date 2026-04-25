import { UserFromDataBase } from './user.from.database';

export interface DataRespDatabase {
  token: string;
  user: UserFromDataBase;
}

export interface ModelRespComplete<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface PaginatedDataDatabase<T> {
  items: T[];
  total: number;
  pages: number;
  page: number;
  has_next: boolean;
}
