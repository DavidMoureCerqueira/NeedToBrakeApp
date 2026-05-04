import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user.service';
import { FormatCarPipe } from '../../pipes/format.car.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'garage-component',
  imports: [FormatCarPipe],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {
  id = input.required<number>();
  userService = inject(UserService);
  authService = inject(AuthService);
  isOwner = signal<boolean>(false);
  constructor() {
    effect(() => {
      const currentUserId = this.authService.currentUserId;
      if (currentUserId) {
        this.isOwner.set(this.id() === currentUserId);
      }
    });
  }

  garageResource = rxResource({
    params: () => ({ id: this.id }),
    stream: ({ params }) => this.userService.getGarage(params.id()),
  });
  garage = computed(() => this.garageResource.value() ?? []);

  addToGarage() {
    // TODO añadir el cascade en componente al buscar, probablemente comandado por el componente padre
    throw new Error('Method not implemented.');
  }

  addFavourite() {
    throw new Error('Method not implemented.');
  }

  removeFavourite() {
    throw new Error('Method not implemented.');
  }
}
