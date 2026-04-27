import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
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
