import { Router, type ResolveFn } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { Post } from '../interfaces/post/post';
import { ForumService } from '../services/forum.service';
import { inject } from '@angular/core';
import { PostDetail } from '../interfaces/post/post.detail';

export const postResolver: ResolveFn<Observable<PostDetail>> = (route, state) => {
  const forumService = inject(ForumService);
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (!id || !Number(id)) {
    router.navigate(['/404']);
    return EMPTY;
  }
  return forumService
    .getPostById(Number(id))
    .pipe(tap((post) => forumService.setInitialData(post)));
};
