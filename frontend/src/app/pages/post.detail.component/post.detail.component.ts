import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-post.detail.component',
  imports: [],
  templateUrl: './post.detail.component.html',
  styleUrl: './post.detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent { }
