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
import { CarSelectorComponent } from '../car.selector.component/car.selector.component';
import { CarClean } from '../../interfaces/cars/car';
import { MatSnackBar } from '@angular/material/snack-bar';
import { successMessages } from '../../../utils/successMessages';

@Component({
  selector: 'garage-component',
  imports: [FormatCarPipe, CarSelectorComponent],

  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {
  private snackbar = inject(MatSnackBar);
  id = input.required<number>();
  userService = inject(UserService);
  authService = inject(AuthService);
  isAddingNewCar = signal<boolean>(false);
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
    this.isAddingNewCar.set(true);
  }
  onVersionIdReceived(car: CarClean) {
    this.userService.addCarGarage(car.version.id).subscribe({
      next: () => {
        this.garageResource.reload();
        this.isAddingNewCar.set(false);
      },
      error: () => {
        console.error('Error adding car to garage');
      },
    });
  }
  addFavourite(id: number) {
    this.userService.addCarFavourite(id).subscribe({
      next: () => {
        this.garageResource.reload();
      },
      error: () => {
        console.error('Error adding favourite');
      },
    });
  }

  removeFavourite() {
    this.userService.removeCarFavourite().subscribe({
      next: (updatedGarage) => {
        this.garageResource.reload();
      },
      error: () => {
        console.error('Error removing favourite');
      },
    });
    throw new Error('Method not implemented.');
  }
  deleteCar(versionId: number) {
    this.userService.removeCarGarage(versionId).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackbar.open(successMessages.CAR_DELETED, 'close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.garageResource.reload();
        } else {
          this.snackbar.open(res.error!, 'close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        }
      },
    });
  }
}
