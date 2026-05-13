import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  ResourceRef,
  signal,
} from '@angular/core';
import { Comment } from '../../../interfaces/post/comment';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommentService } from '../../../services/comment.service';
import { successMessages } from '../../../../utils/successMessages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pagination } from '../../../interfaces/pagination';

@Component({
  selector: 'comment-component',
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  isEditing = signal<boolean>(false);
  authService = inject(AuthService);
  comment = input.required<Comment>();
  commentService = inject(CommentService);
  resource = input.required<ResourceRef<Pagination<Comment>>>();
  private snackbar = inject(MatSnackBar);

  editForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  isOwner = signal<boolean>(false);
  constructor() {
    effect(() => {
      this.isOwner.set(this.authService.currentUserId === this.comment().author.id);
    });
  }
  startEdit() {
    this.editForm.patchValue({
      content: this.comment().content,
    });
    this.isEditing.set(true);
  }

  saveEdit() {
    const form = this.editForm;
    if (form && form.value.content) {
      const content = form.value.content;
      this.commentService.modifyComment(content, this.comment().id).subscribe({
        next: () => {
          this.snackbar.open(successMessages.COMMENT_MODIFIED, 'close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.isEditing.set(false);
          this.resource().reload();
        },
        error: (err) => {
          this.snackbar.open(err, 'close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
