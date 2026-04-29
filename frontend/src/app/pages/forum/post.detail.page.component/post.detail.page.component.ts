import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { PostDetail } from '../../../interfaces/post/post.detail';
import { PostDetailComponent } from '../../../componentes/forum/post.detail.component/post.detail.component';
import { CommentListComponent } from '../../../componentes/forum/comment.list.component/comment.list.component';
import { WriteCommentComponent } from '../write.comment.component/write.comment.component';
import { CommentService } from '../../../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { successMessages } from '../../../../utils/successMessages';

@Component({
  selector: 'post.detail.component',
  imports: [PostDetailComponent, CommentListComponent, WriteCommentComponent],
  templateUrl: './post.detail.page.component.html',
  styleUrl: './post.detail.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailPageComponent {
  post = input.required<PostDetail>();
  isCommenting = signal<boolean>(false);
  commentService = inject(CommentService);
  commentCount = signal<number>(0);

  private snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      this.commentCount.set(this.post().commentCount);
    });
  }

  handleShowCommentinInput() {
    this.isCommenting.update((value) => !value);
  }

  updateCount(newTotal: number) {
    this.commentCount.set(newTotal);
  }

  createComment(comment: string) {
    this.commentService.saveComment({ content: comment, post_id: this.post().id }).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackbar.open(successMessages.MESSAGE_CREATED, 'close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.commentService.notifyCommentAdded();
        } else {
          this.snackbar.open(res.error!, 'close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        }
      },
    });
  }
}
