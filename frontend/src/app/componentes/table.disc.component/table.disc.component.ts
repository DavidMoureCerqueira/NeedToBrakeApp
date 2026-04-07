import { Disc } from '../../interfaces/disco';
import { Component, inject, output, signal } from '@angular/core';

import { DiscoService } from '../../services/disc.service';
import { DiscIlustrationComponent } from '../disco-ilustracion/disc-ilustration';
import { ListDiscComponent } from '../list-disc/list-disc';
import { CarDisc } from '../../interfaces/car-disc';
import { DesiredDiscComponent } from './desired.disc.component/desired.disc.component';
import { DiscoExistenteComponent } from './existing.disc.component/existing.disc.component';
// import { carDisco } from '../../interfaces/coche-disco';

@Component({
  selector: 'table-disc',
  imports: [
    ListDiscComponent,
    DiscIlustrationComponent,
    DesiredDiscComponent,
    DiscoExistenteComponent,
  ],
  templateUrl: './table.disc.component.html',
  styleUrl: './table.disc.component.css',
})
export class TableDiscComponent {
  discService = inject(DiscoService);
  discoVacio: Disc = {
    position: null,
    style: null,
    diameter: 0,
    height: 0,
    thicknessNew: 0,
    thicknessMin: 0,
    pcd: 0,
    holes: 0,
    centerbore: 0,
    diameterInterior: 0,
    diameterTornillo: 0,
  };

  discoDeseado = signal<Disc>(this.discoVacio);

  discoExistente = signal<Disc>(this.discoVacio);

  listDiscCar = signal<CarDisc[] | []>([]);

  recibirDiscoDeseado(disco: Disc) {
    this.discoDeseado.set(disco);
  }

  recibirDiscoExistente(disco: Disc) {
    this.discoExistente.set(disco);
  }

  enviarDiscos() {
    this.discService.buscarPorMedidas(this.discoDeseado()).subscribe({
      next: (data) => {
        console.log('Comunicacion Correcta', data);
        this.listDiscCar.set(data);
      },
      error(error) {
        console.log('No hay resultados');
      },
    });
  }

  igualarDatosVacios() {
    console.log('igualar');
    const discoModificado = this.discService.igualarDatos(
      this.discoExistente(),
      this.discoDeseado(),
    );
    this.discoDeseado.set(discoModificado);
  }
}
