import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormatVersionPipe } from '../../../pipes/format.version.pipe';
import { DatePipe } from '@angular/common';
import { PostDetail } from '../../../interfaces/post/post.detail';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'post-detail-component',
  imports: [FormatVersionPipe, DatePipe, RouterLink],
  templateUrl: './post.detail.component.html',
  styleUrl: './post.detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  post = input.required<PostDetail>();
  showCommentInput = output();
  isCommenting = input.required<boolean>();
  commentCount = input.required<number>();
  likeEmitter = output<boolean>();

  emitCommentingInput() {
    this.showCommentInput.emit();
  }
  handleLike() {
    console.log('click');
    if (this.post().isLiked) {
      this.likeEmitter.emit(false);
    } else {
      this.likeEmitter.emit(true);
    }
  }
}
