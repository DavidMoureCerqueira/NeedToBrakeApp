import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { User } from '../../interfaces/users/user';
import { GarageComponent } from '../garage.component/garage.component';
import { PostListComponent } from '../post.list.component/post.list.component';

@Component({
  selector: 'profile-card-component',
  imports: [GarageComponent, PostListComponent],
  templateUrl: './profile.card.component.html',
  styleUrl: './profile.card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  user = input.required<User | null>();
  constructor() {
    effect(() => {
      console.log(this.user());
    });
  }
}
