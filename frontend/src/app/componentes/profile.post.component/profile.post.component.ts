import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'profile-post-component',
  imports: [DatePipe],
  templateUrl: './profile.post.component.html',
  styleUrl: './profile.post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePostComponent {
  id = input.required<number>();
  postService = inject(ForumService);

  postResource = rxResource({
    params: () => ({ id: this.id }),
    stream: ({ params }) => this.postService.getLatestPost(),
  });
  userPosts = computed(
    () => this.postResource.value() ?? { items: [], total: 0, pages: 1, page: 1, hasNext: false },
  );
  constructor() {
    effect(() => {});
  }
}
