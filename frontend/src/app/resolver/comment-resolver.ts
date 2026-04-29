import type { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post/post';
import { ForumService } from '../services/forum.service';
import { inject } from '@angular/core';
import { PostDetail } from '../interfaces/post/post.detail';

export const postResolver: ResolveFn<Observable<PostDetail>> = (route, state) => {
  const forumService = inject(ForumService);
  const id = route.paramMap.get('id');
  return forumService.getPostById(id!);
};
