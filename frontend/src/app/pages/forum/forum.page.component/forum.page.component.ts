import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Post } from '../../../interfaces/post/post';
import { Pagination } from '../../../interfaces/pagination';
import { DatePipe } from '@angular/common';
import { ForumService } from '../../../services/forum.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../componentes/pagination.component/pagination.component';
import { ForumStateService } from '../../../services/forum.state.service';

@Component({
  selector: 'forum-page-component',
  imports: [DatePipe, PaginationComponent, RouterLink],
  templateUrl: './forum.page.component.html',
  styleUrl: './forum.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPageComponent {
  private forumService = inject(ForumService);
  private route = inject(ActivatedRoute);
  private forumState = inject(ForumStateService);
  forum = signal<Pagination<Post>>(this.route.snapshot.data['forum']);
  posts = computed(() => this.forum().items);

  constructor() {
    effect(() => {
      console.log(this.forum());
    });
  }

  getItemsByPage(page: number) {
    if (page === this.forum().page) return;
    if (page === this.forum().pages + 1) return;
    this.forumState.page.set(page);
    this.forumService.getLatestPost(page).subscribe({
      next: (newData) => {
        this.forum.set(newData);
      },
      error: (err) => console.error('Error in pagination', err),
    });
  }
}
