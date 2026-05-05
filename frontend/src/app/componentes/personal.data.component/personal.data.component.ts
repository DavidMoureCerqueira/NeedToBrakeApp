import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Profile } from '../../interfaces/users/profile';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileEdit } from '../../interfaces/users/profile.edit';

@Component({
  selector: 'app-personal-data-component',
  imports: [ReactiveFormsModule],
  templateUrl: './personal.data.component.html',
  styleUrl: './personal.data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent {
  isEditing = signal<boolean>(false);
  profile = input.required<Profile>();
  private fb = inject(FormBuilder);
  userService = inject(UserService);
  profileForm = this.fb.group({
    country: [''],
    flag: [''],
    favPads: [''],
    favCircuit: [''],
  });
  constructor() {
    effect(() => {
      console.log(this.profile());
    });
  }
  toggleIsEditing() {
    if (!this.isEditing()) {
      const current = this.profile();
      if (current) {
        this.profileForm.patchValue({
          country: current.country,
          flag: current.flag,
          favCircuit: current.favCircuit,
          favPads: current.favPads,
        });
      }
    }
    this.isEditing.set(!this.isEditing());
  }

  onCountryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const countries = this.userService.countriesResource.value() || [];

    const found = countries.find((country) => country.name.toLowerCase() === value.toLowerCase());
    if (found) {
      this.profileForm.patchValue({
        country: found.name,
        flag: found.flag,
      });
    } else {
      // Si el usuario borra el texto o no hay coincidencia, limpiamos la selección
      this.profileForm.patchValue({
        country: '',
        flag: '',
      });
    }
  }
  onSaveChanges() {
    if (this.profileForm.invalid) return;
    this.userService.updateProfile(this.profileForm.value as ProfileEdit).subscribe({
      next: () => {
        this.userService.profileResource.reload();
      },
      error: (msg: string) => {
        console.log('ERROR:', msg);
      },
    });
    this.isEditing.set(false);
  }
}
