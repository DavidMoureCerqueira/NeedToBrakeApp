import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../../interfaces/pagination';
import { Post } from '../../../interfaces/post/post';
import { FormatCarPipe } from '../../../pipes/format.car.pipe';

@Component({
  selector: 'post-list-component',
  imports: [RouterLink, DatePipe, FormatCarPipe],
  templateUrl: './post.list.component.html',
  styleUrl: './post.list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  forum = input.required<Pagination<Post>>();
}
