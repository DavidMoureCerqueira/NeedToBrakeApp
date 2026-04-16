import {
  ChangeDetectionStrategy,
  Component,
  inject,
  effect,
  computed,
  signal,
} from '@angular/core';
import { ProfileCardComponent } from '../../componentes/profile.card.component/profile.card.component';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/users/user';
@Component({
  selector: 'app-profile.page.component',
  imports: [ProfileCardComponent],
  templateUrl: './profile.page.component.html',
  styleUrl: './profile.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private userService = inject(UserService);

  public user = signal<User | null>(null);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);
  constructor() {
    this.loadProfile();
    effect(() => {
      console.log(this.user());
    });
  }
  loadProfile() {
    this.isLoading.set(true);
    this.error.set(null);
    this.userService.getProfile().subscribe({
      next: (userData) => {
        console.info('User received on profile');
        this.user.set(userData);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(`Error:${err.statusText}`);
        console.log(err);
        console.log(this.error());
      },
    });
  }
}
