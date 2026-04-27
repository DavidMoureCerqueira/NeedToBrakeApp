import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormatVersionPipe } from '../../../pipes/format.version.pipe';
import { DatePipe } from '@angular/common';
import { PostDetail } from '../../../interfaces/post/post.detail';

@Component({
  selector: 'post-detail-component',
  imports: [FormatVersionPipe, DatePipe],
  templateUrl: './post.detail.component.html',
  styleUrl: './post.detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  post = input.required<PostDetail>();
  showCommentInput = output();
  isCommenting = input.required<boolean>();
  commentCount = input.required<number>();

  emitCommentingInput() {
    this.showCommentInput.emit();
  }
}
