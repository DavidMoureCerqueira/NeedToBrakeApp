import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ResourceRef,
} from '@angular/core';

import { PaginationComponent } from '../../pagination.component/pagination.component';
import { CommentComponent } from '../comment.component/comment.component';
import { Pagination } from '../../../interfaces/pagination';
import { Comment } from '../../../interfaces/post/comment';

@Component({
  selector: 'comment-list-component',
  imports: [PaginationComponent, CommentComponent],
  templateUrl: './comment.list.component.html',
  styleUrl: './comment.list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  pageChange = output<number>();
  commentResource = input.required<ResourceRef<Pagination<Comment>>>();
  paginationComments = computed(() => this.commentResource().value());
  commentListUpdate = output<void>();
  getItemsByPage(page: number) {
    if (page === this.paginationComments().page) return;
    if (page === this.paginationComments().pages + 1) return;
    this.pageChange.emit(page);
  }
  commentUpdate() {
    this.commentListUpdate.emit();
  }
}
