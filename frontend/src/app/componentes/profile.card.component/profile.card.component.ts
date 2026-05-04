import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Profile } from '../../interfaces/users/profile';
import { MAX_FILE_SIZE } from '../../interfaces/image.filter';
import { ALLOWED_EXTENSIONS } from '../../interfaces/image.filter';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'profile-card-component',
  imports: [],
  templateUrl: './profile.card.component.html',
  styleUrl: './profile.card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  userService = inject(UserService);
  profile = input.required<Profile | null>();
  error = signal<string>('');
  constructor() {
    effect(() => console.log(this.profile()));
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!ALLOWED_EXTENSIONS.includes(file.type)) {
      console.error('Extension not allowed', file.type);
      this.error.set(`Extension not allowed, ${file.type}`);
      input.value = '';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      console.error('Image too heavy', file.size);
      this.error.set(`Image too heavy, ${file.size}`);
      input.value = '';
      return;
    }
    this.userService.addAvatar(file).subscribe({
      next: () => {
        console.log('Actualizando imagen');
        this.userService.profileResource.reload();
      },
      error: (err) => {
        console.error('Error loading profile in component', err);
      },
    });
  }
}
