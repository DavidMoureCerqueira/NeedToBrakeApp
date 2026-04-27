import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpContext, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {
  ModelRespComplete,
  PaginatedDataDatabase,
} from '../interfaces/database.responses/modelResp';
import { PostFromDatabase } from '../interfaces/database.responses/post.from.database';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { Post } from '../interfaces/post/post';
import { Pagination } from '../interfaces/pagination';
import { mapPaginationDatabaseToPagination } from './../mappers/mapPaginationDatabaseToPagination';
import {
  mapPostDatabaseToPost,
  mapPostDatabaseToPostArray,
} from './../mappers/mapPostDatabaseToPost';
import { postCreation } from '../interfaces/post/post.creation';
import { mapPostCreationToPostToDatabase } from './../mappers/mapPostCreationToPostToDatabase';
import { REQUIRES_AUTH } from '../auth/auth.context';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private API_URL = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  getLatestPost(page: number = 1, limit = 5): Observable<Pagination<Post>> {
    const URL = `${this.API_URL}/post/latest`;
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http
      .get<ModelRespComplete<PaginatedDataDatabase<PostFromDatabase>>>(URL, { params })
      .pipe(
        tap((res) => console.log(res)),
        map((res) => {
          if (!res.success || !res.data) {
            throw new Error(res.error);
          }
          const mappedItems = mapPostDatabaseToPostArray(res.data.items);
          const pagination = mapPaginationDatabaseToPagination(res.data);

          return { ...pagination, items: mappedItems };
        }),
        catchError((err) => {
          console.error('Error in serice', err);
          return throwError(() => err);
        }),
      );
  }
  createPost(post: postCreation): Observable<ModelRespComplete<Post>> {
    const URL = `${this.API_URL}/post/create`;
    const postDatabase = mapPostCreationToPostToDatabase(post);
    return this.http
      .post<ModelRespComplete<PostFromDatabase>>(URL, postDatabase, {
        context: new HttpContext().set(REQUIRES_AUTH, true),
      })
      .pipe(
        map((data) => {
          if (data.success && data.data) {
            return {
              success: data.success,
              data: mapPostDatabaseToPost(data.data),
            };
          }
          return {
            success: data.success,
            error: data.error,
          };
        }),
      );
  }
  getPostById(post:Post):Observable<ModelRespComplete<Post>>{
    const URL= 
  }
}
