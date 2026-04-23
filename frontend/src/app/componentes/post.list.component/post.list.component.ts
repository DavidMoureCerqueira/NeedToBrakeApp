import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'post-list-component',
  imports: [],
  templateUrl: './post.list.component.html',
  styleUrl: './post.list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {}
