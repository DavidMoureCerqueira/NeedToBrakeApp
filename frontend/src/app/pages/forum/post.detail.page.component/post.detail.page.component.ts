import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { PostDetail } from '../../../interfaces/post/post.detail';
import { PostDetailComponent } from '../../../componentes/forum/post.detail.component/post.detail.component';
import { CommentListComponent } from '../../../componentes/forum/comment.list.component/comment.list.component';
import { WriteCommentComponent } from '../write.comment.component/write.comment.component';
import { CommentService } from '../../../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { successMessages } from '../../../../utils/successMessages';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'post.detail.component',
  imports: [PostDetailComponent, CommentListComponent, WriteCommentComponent],
  templateUrl: './post.detail.page.component.html',
  styleUrl: './post.detail.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailPageComponent {
  postData = input.required<PostDetail>();
  isCommenting = signal<boolean>(false);
  commentService = inject(CommentService);
  forumService = inject(ForumService);
  postId = computed(() => this.postData().id);
  private snackbar = inject(MatSnackBar);
  currentPage = signal(1);
  commentsResource = this.commentService.getCommentsResource(this.postId, this.currentPage);

  postResource = this.forumService.postDetailResource;
  post = computed(() => this.forumService.postDetailResource.value());

  handleShowCommentinInput() {
    this.isCommenting.update((value) => !value);
  }
  handlePageChange(page: number) {
    this.currentPage.set(page);
  }
  createComment(comment: string) {
    this.commentService.saveComment({ content: comment, post_id: this.post().id }).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackbar.open(successMessages.COMMENT_CREATED, 'close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.commentsResource.reload();
          this.postResource.reload();
          this.isCommenting.set(false);
        } else {
          this.snackbar.open(res.error!, 'close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        }
      },
    });
  }
  updateData() {
    this.postResource.reload();
  }
}
