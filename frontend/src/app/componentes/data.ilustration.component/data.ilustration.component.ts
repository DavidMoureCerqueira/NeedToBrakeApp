import { ChangeDetectionStrategy, Component, effect, inject, input, model } from '@angular/core';
import { DiscDataComponent } from '../disc.data.component/disc.data.component';
import { DiscIlustrationComponent } from '../disc.ilustration.component/disc.ilustration.component';
import { Disc } from '../../interfaces/disc/disc';
import { DiscTheme } from '../../styles/discThemes';
import { CarClean } from '../../interfaces/cars/car';
import { DISC_CONTEXT } from '../../services/car.service';

@Component({
  selector: 'data-ilustration-component',
  imports: [DiscDataComponent, DiscIlustrationComponent],
  templateUrl: './data.ilustration.component.html',
  styleUrl: './data.ilustration.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DISC_CONTEXT,
      useFactory: () => {
        const component = inject(DataIlustrationComponent);
        return component.token();
      },
    },
  ],
})
export class DataIlustrationComponent {
  title = input.required<string>();
  themeName = input.required<DiscTheme>();
  disc = model.required<Disc>();
  token = input.required<'existing' | 'desired'>();
  constructor() {
    effect(() => console.log('Data Ilustration:', this.disc()));
  }
}
