import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';

@Component({
  selector: 'measurement-component',
  imports: [],
  templateUrl: './measurement.component.html',
  styleUrl: './measurement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasurementComponent {
  disc = model.required<Disc>();
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
  }
}
