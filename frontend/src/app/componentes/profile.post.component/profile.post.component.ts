import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'profile-post-component',
  imports: [],
  templateUrl: './profile.post.component.html',
  styleUrl: './profile.post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePostComponent {}
