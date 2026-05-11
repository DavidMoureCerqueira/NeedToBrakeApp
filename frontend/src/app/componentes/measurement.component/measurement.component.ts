import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'measurement-component',
  imports: [],
  templateUrl: './measurement.component.html',
  styleUrl: './measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasurementComponent {
  disc = model.required<Disc>();
  token = input.required<'desired' | 'existing'>();
  carService = inject(CarService);
  constructor() {
    effect(() => {
      console.log('style:', this.disc().style);
    });
  }
  updateDisc(key: keyof Disc, value: string | number) {
    this.disc.update((actualDisc) => ({
      ...actualDisc,
      [key]: value === '' ? '' : value,
    }));
    this.carService.resetCar(this.token());
  }
}
