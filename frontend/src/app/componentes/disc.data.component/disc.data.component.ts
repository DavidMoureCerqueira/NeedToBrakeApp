import { Component, computed, input, model, signal } from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';
import { DiscTheme, THEMES } from '../../styles/discThemes';
import { MeasurementComponent } from '../measurement.component/measurement.component';
import { SearchMode, searchModeTypes } from './../../interfaces/searchModeTypes';
import { CascadeComponent } from '../cascade.component/cascade.component';

@Component({
  selector: 'disc-data',
  imports: [MeasurementComponent, CascadeComponent],
  templateUrl: './disc.data.component.html',
  styleUrl: './disc.data.component.css',
})
export class DiscDataComponent {
  protected readonly SEARCH_MODES = searchModeTypes;
  title = input.required<string>();
  disc = model.required<Disc>();
  themeName = input.required<DiscTheme>();
  theme = computed(() => THEMES[this.themeName()]);
  searchMode = signal<SearchMode>(searchModeTypes.CAR);
  constructor() {}

  toggleMode(mode: SearchMode) {
    this.searchMode.set(mode);
  }
  clearFields() {
    this.disc.set({} as Disc);
  }
}
