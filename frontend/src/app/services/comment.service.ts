import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import {
  ModelRespComplete,
  PaginatedDataDatabase,
} from '../interfaces/database.responses/modelResp';
import { REQUIRES_AUTH } from '../auth/auth.context';
import { Comment } from '../interfaces/post/comment';
import {
  mapCommentDatabaseToComment,
  mapCommentDatabaseToCommentArray,
} from '../mappers/mapCommentDatabaseToComment';
import { Pagination } from '../interfaces/pagination';
import { CommentFromDatabase } from '../interfaces/database.responses/comment.from.database';
import { mapPaginationDatabaseToPagination } from '../mappers/mapPaginationDatabaseToPagination';
import { CommentForDatabase } from '../interfaces/database.request/comment.for.database';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private API_URL = environment.apiUrl;
  private http = inject(HttpClient);
  private refreshCommentsSource = new Subject<void>();

  refreshComments = this.refreshCommentsSource.asObservable();
  constructor() {}

  getCommentsByPostId(
    postId: number,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Comment>> {
    const URL = `${this.API_URL}/comment/by-post/${postId}`;
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http
      .get<
        ModelRespComplete<PaginatedDataDatabase<CommentFromDatabase>>
      >(URL, { params, context: new HttpContext().set(REQUIRES_AUTH, true) })
      .pipe(
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error || 'Post id failed');
          }
          console.log(res);
          const mappedItems = mapCommentDatabaseToCommentArray(res.data.items);
          const pagination = mapPaginationDatabaseToPagination(res.data);
          return { ...pagination, items: mappedItems };
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  saveComment(data: CommentForDatabase): Observable<ModelRespComplete<Comment>> {
    const URL = `${this.API_URL}/comment/create`;

    return this.http
      .post<ModelRespComplete<CommentFromDatabase>>(URL, data, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        map((data) => {
          if (data.success && data.data) {
            return {
              success: data.success,
              data: mapCommentDatabaseToComment(data.data),
            };
          }
          return {
            success: data.success,
            error: data.error,
          };
        }),
      );
  }
  notifyCommentAdded() {
    this.refreshCommentsSource.next();
  }
}
