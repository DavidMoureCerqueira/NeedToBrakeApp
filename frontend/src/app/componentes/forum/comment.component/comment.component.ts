import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comment } from '../../../interfaces/post/comment';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'comment-component',
  imports: [DatePipe, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input.required<Comment>();
}
