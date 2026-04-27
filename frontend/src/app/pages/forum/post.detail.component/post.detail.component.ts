import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { PostDetail } from '../../../interfaces/post/post.detail';

@Component({
  selector: 'app-post.detail.component',
  imports: [],
  templateUrl: './post.detail.component.html',
  styleUrl: './post.detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  post = input.required<PostDetail>();
  constructor() {
    effect(() => console.log(this.post()));
  }
}
