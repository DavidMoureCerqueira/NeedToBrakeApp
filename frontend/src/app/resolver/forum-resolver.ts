import type { ResolveFn } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { inject } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

export const forumResolver: ResolveFn<Observable<Pagination<Post>>> = (route, state) => {
  const forumService = inject(ForumService);
  return forumService.getLatestPost();
};
