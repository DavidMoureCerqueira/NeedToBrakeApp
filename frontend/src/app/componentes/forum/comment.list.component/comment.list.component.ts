import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../interfaces/post/comment';
import { Pagination } from '../../../interfaces/pagination';
import { DatePipe } from '@angular/common';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PaginationComponent } from '../../pagination.component/pagination.component';

@Component({
  selector: 'comment-list-component',
  imports: [DatePipe, PaginationComponent],
  templateUrl: './comment.list.component.html',
  styleUrl: './comment.list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  postId = input.required<number>();
  currentPage = linkedSignal({
    source: () => this.postId(),
    computation: () => 1,
  });

  private commentService = inject(CommentService);

  private commentsResource = rxResource({
    params: () => ({ id: this.postId(), page: this.currentPage() }),
    stream: ({ params }) => this.commentService.getCommentsByPostId(params.id, params.page),
  });
  paginationComments = computed(
    () =>
      this.commentsResource.value() ?? { items: [], total: 0, page: 1, pages: 0, hasNext: false },
  );

  constructor() {}

  getItemsByPage(page: number) {
    if (page === this.paginationComments().page) return;
    if (page === this.paginationComments().pages + 1) return;
    this.currentPage.set(page);
  }
}
