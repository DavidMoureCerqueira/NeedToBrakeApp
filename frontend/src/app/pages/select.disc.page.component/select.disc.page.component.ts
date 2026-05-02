import { Component, inject, signal } from '@angular/core';
import { DiscoService } from '../../services/disc.service';
import { DiscApiService } from '../../services/disc.api.service';
import { Disc } from '../../interfaces/disc/disc';
import { CarDisc } from '../../interfaces/disc/car.disc';
import { ListDiscComponent } from '../../componentes/list.disc.component/list.disc.component';
import { DataIlustrationComponent } from '../../componentes/data.ilustration.component/data.ilustration.component';

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
  listDiscCar = signal<CarDisc[] | []>([]);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);

  receiveDesiredDisc(disco: Disc) {
    this.desiredDisc.set(disco);
  }

  receiveExistingDisc(disco: Disc) {
    this.existingDisc.set(disco);
  }

  searchDiscs() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.listDiscCar.set([]);

    this.discService.saveExistingDisc(this.existingDisc());
    this.discApiService.discByFilter(this.desiredDisc()).subscribe({
      next: (data) => {
        this.listDiscCar.set(data);
      },
      error: (error) => {
        console.log('No hay resultados', error);
        this.isError.set(true);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  syncEmptyFields() {
    const discoModificado = this.discService.matchDiscs(this.existingDisc(), this.desiredDisc());
    this.desiredDisc.set(discoModificado);
  }
}
