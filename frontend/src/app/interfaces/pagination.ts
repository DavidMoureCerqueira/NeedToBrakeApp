export interface Pagination<T> {
  items: T[];
  total: number;
  pages: number;
  page: number;
  hasNext: boolean;
}
