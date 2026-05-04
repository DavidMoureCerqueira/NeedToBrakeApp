import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { DiscDataComponent } from '../disc.data.component/disc.data.component';
import { DiscIlustrationComponent } from '../disc.ilustration.component/disc.ilustration.component';
import { Disc } from '../../interfaces/disc/disc';
import { DiscTheme } from '../../styles/discThemes';

@Component({
  selector: 'data-ilustration-component',
  imports: [DiscDataComponent, DiscIlustrationComponent],
  templateUrl: './data.ilustration.component.html',
  styleUrl: './data.ilustration.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataIlustrationComponent {
  title = input.required<string>();
  themeName = input.required<DiscTheme>();
  disc = model.required<Disc>();

  constructor() {}
}
