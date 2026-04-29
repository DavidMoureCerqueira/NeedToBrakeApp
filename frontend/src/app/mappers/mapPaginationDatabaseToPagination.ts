import { PaginatedDataDatabase } from '../interfaces/database.responses/modelResp';
import { Pagination } from '../interfaces/pagination';

export function mapPaginationDatabaseToPagination<T>(
  paginationDB: PaginatedDataDatabase<T>,
): Pagination<T> {
  return {
    items: paginationDB.items,
    total: paginationDB.total,
    page: paginationDB.page,
    pages: paginationDB.pages,
    hasNext: paginationDB.has_next,
  };
}
