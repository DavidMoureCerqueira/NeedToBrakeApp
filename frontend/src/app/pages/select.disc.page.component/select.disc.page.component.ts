import { Component, computed, effect, inject, signal } from '@angular/core';
import { DiscoService } from '../../services/disc.service';
import { DiscApiService } from '../../services/disc.api.service';
import { Disc } from '../../interfaces/disc/disc';
import { CarDisc } from '../../interfaces/disc/car.disc';
import { ListDiscComponent } from '../../componentes/list.disc.component/list.disc.component';
import { DataIlustrationComponent } from '../../componentes/data.ilustration.component/data.ilustration.component';
import { CarClean } from '../../interfaces/cars/car';

@Component({
  selector: 'select-disc-page',
  imports: [ListDiscComponent, DataIlustrationComponent],
  templateUrl: './select.disc.page.component.html',
  styleUrl: 'select.disc.page.component.css',
})
export class SelectDiscPageComponent {
  imageLogoPath: string = 'images/logo.sf.png';
  discService = inject(DiscoService);
  discApiService = inject(DiscApiService);

  desiredDisc = signal<Disc>({} as Disc);
  existingDisc = signal<Disc>({} as Disc);
  isFilters = signal<Boolean>(false);
  listDiscCar = signal<CarDisc[] | []>([]);
  existingCar = signal<CarClean>({} as CarClean);
  desiredCar = signal<CarClean>({} as CarClean);

  constructor() {
    effect(() => {
      console.log('Existing car:', this.existingCar());
      console.log('Desired Car', this.desiredCar());
    });
  }

  receiveDesiredDisc(disco: Disc) {
    this.desiredDisc.set(disco);
  }

  receiveExistingDisc(disco: Disc) {
    this.existingDisc.set(disco);
  }

  searchDiscs() {
    this.listDiscCar.set([]);
    this.discService.saveExistingDisc(this.existingDisc());
    this.discService.saveDesiredDisc(this.desiredDisc());
    if (this.discApiService.hasAnyValue(this.desiredDisc())) {
      this.isFilters.set(true);
      return;
    }
    this.discApiService.desiredDisc.set(this.desiredDisc());
    this.isFilters.set(false);
  }

  syncEmptyFields() {
    const discoModificado = this.discService.matchDiscs(this.existingDisc(), this.desiredDisc());
    this.desiredDisc.set(discoModificado);
    this.desiredCar.set(this.existingCar());
  }
  hasData = computed(() => {
    const listResource = this.discApiService.filteredDiscResource;
    if (listResource.error() && !listResource.hasValue()) return false;
    return listResource.value().length > 0;
  });
}
