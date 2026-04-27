import type { ResolveFn } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { inject } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { Post } from '../interfaces/post/post';
import { Observable } from 'rxjs';
import { ForumStateService } from '../services/forum.state.service';

export const forumResolver: ResolveFn<Observable<Pagination<Post>>> = (route, state) => {
  const forumState = inject(ForumStateService);
  const forumService = inject(ForumService);
  const page = forumState.page();
  return forumService.getLatestPost(page);
};
