import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { GarageComponent } from '../garage.component/garage.component';
import { Profile } from '../../interfaces/users/profile';
import { ProfilePostComponent } from '../profile.post.component/profile.post.component';

@Component({
  selector: 'profile-card-component',
  imports: [GarageComponent, ProfilePostComponent],
  templateUrl: './profile.card.component.html',
  styleUrl: './profile.card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  profile = input.required<Profile | null>();
  constructor() {
    effect(() => {
      console.log(this.profile());
    });
  }
}
