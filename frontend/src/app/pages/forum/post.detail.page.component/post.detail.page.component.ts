import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { PostDetail } from '../../../interfaces/post/post.detail';
import { PostDetailComponent } from '../../../componentes/forum/post.detail.component/post.detail.component';
import { CommentListComponent } from '../../../componentes/forum/comment.list.component/comment.list.component';

@Component({
  selector: 'post.detail.component',
  imports: [PostDetailComponent, CommentListComponent],
  templateUrl: './post.detail.page.component.html',
  styleUrl: './post.detail.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailPageComponent {
  post = input.required<PostDetail>();
  constructor() {
    effect(() => console.log(this.post()));
  }
}
