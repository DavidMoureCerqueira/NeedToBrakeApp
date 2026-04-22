import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'forum-page-component',
  imports: [],
  templateUrl: './forum.page.component.html',
  styleUrl: './forum.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPageComponent {}
