import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from '../pagination.component/pagination.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormatCarPipe } from '../../pipes/format.car.pipe';

@Component({
  selector: 'profile-post-component',
  imports: [DatePipe, PaginationComponent, RouterLink, FormatCarPipe],
  templateUrl: './profile.post.component.html',
  styleUrl: './profile.post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePostComponent {
  id = input.required<number>();
  postService = inject(ForumService);
  page = signal<number>(1);
  authService = inject(AuthService);
  isOwner = signal<boolean>(false);
  constructor() {
    effect(() => {
      const currentUserId = this.authService.currentUserId;
      if (currentUserId) {
        this.isOwner.set(this.id() === currentUserId);
      }
    });
  }
  postResource = rxResource({
    params: () => ({ id: this.id(), page: this.page() }),
    stream: ({ params }) => this.postService.getLatestPostByUser(params.id, params.page),
  });
  userPosts = computed(
    () => this.postResource.value() ?? { items: [], total: 0, pages: 1, page: 1, hasNext: false },
  );
  getItemsByPage(page: number) {
    this.page.set(page);
  }
}
