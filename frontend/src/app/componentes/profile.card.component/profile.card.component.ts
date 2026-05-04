import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../interfaces/users/profile';

@Component({
  selector: 'profile-card-component',
  imports: [],
  templateUrl: './profile.card.component.html',
  styleUrl: './profile.card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  profile = input.required<Profile | null>();
  constructor() {}
}
