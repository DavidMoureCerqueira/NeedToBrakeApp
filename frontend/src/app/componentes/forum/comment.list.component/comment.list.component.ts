import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { rxResource, takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../pagination.component/pagination.component';
import { CommentComponent } from '../comment.component/comment.component';

@Component({
  selector: 'comment-list-component',
  imports: [PaginationComponent, CommentComponent],
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
  totalCommentsChanged = output<number>();
  private commentService = inject(CommentService);

  private commentsResource = rxResource({
    params: () => ({ id: this.postId(), page: this.currentPage() }),
    stream: ({ params }) => this.commentService.getCommentsByPostId(params.id, params.page),
  });

  paginationComments = computed(
    () =>
      this.commentsResource.value() ?? { items: [], total: 0, page: 1, pages: 0, hasNext: false },
  );

  constructor() {
    effect(() => {
      const res = this.commentsResource.value();
      if (res) {
        this.totalCommentsChanged.emit(res.total);
      }
    });

    this.commentService.refreshComments.pipe(takeUntilDestroyed()).subscribe(() => {
      this.commentsResource.reload();
    });
  }

  getItemsByPage(page: number) {
    if (page === this.paginationComments().page) return;
    if (page === this.paginationComments().pages + 1) return;
    this.currentPage.set(page);
  }
}
