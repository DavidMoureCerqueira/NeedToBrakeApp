import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
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
  disc = signal<Disc>({} as Disc);
  discEmitter = output<Disc>({});
  modifiedDisc = input<Disc>({} as Disc);

  constructor() {
    effect(() => {
      this.disc.set(this.modifiedDisc());
    });
  }
  handleReceiveDisc(disc: Disc) {
    this.disc.set(disc);
    this.discEmitter.emit(disc);
  }
}
