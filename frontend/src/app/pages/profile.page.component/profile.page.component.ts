import { ChangeDetectionStrategy, Component, effect, signal, input } from '@angular/core';
import { ProfileCardComponent } from '../../componentes/profile.card.component/profile.card.component';
import { Profile } from '../../interfaces/users/profile';
@Component({
  selector: 'app-profile.page.component',
  imports: [ProfileCardComponent],
  templateUrl: './profile.page.component.html',
  styleUrl: './profile.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profile = input.required<Profile>();
  public isLoading = signal<boolean>(true);
  constructor() {
    effect(() => {
      console.log(this.profile());
    });
  }
}
