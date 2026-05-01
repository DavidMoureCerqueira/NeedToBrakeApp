import { Component, computed, effect, input, output, signal, ViewChild } from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';
import { DiscTheme, THEMES } from '../../styles/discThemes';

@Component({
  selector: 'disc-data',
  imports: [],
  templateUrl: './disc.data.component.html',
  styleUrl: './disc.data.component.css',
})
export class DiscDataComponent {
  constructor() {
    console.log(this.disc().position);
    effect(() => {
      this.disc.set(this.modifiedDisc());
    });
  }
  title = input.required<string>();

  disc = signal<Disc>({} as Disc);

  themeName = input.required<DiscTheme>();
  theme = computed(() => THEMES[this.themeName()]);
  discEmitter = output<Disc>({});
  modifiedDisc = input<Disc>({} as Disc);

  updateDisc(key: keyof Disc, value: string | number): void {
    this.disc.update((actualDisc) => ({
      ...actualDisc,
      [key]: value === '' ? '' : value,
    }));
    this.discEmitter.emit(this.disc());
  }
  clearFields() {
    this.disc.set({} as Disc);
  }
}
