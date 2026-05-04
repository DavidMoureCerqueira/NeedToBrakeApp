import { ChangeDetectionStrategy, Component, effect, signal, input } from '@angular/core';
import { ProfileCardComponent } from '../../componentes/profile.card.component/profile.card.component';
import { Profile } from '../../interfaces/users/profile';
import { GarageComponent } from '../../componentes/garage.component/garage.component';
import { ProfilePostComponent } from '../../componentes/profile.post.component/profile.post.component';
@Component({
  selector: 'app-profile.page.component',
  imports: [ProfileCardComponent, GarageComponent, ProfilePostComponent],
  templateUrl: './profile.page.component.html',
  styleUrl: './profile.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profile = input.required<Profile>();
  constructor() {}
}
