import { Component, inject, output, signal } from '@angular/core';
import { DiscoService } from '../../services/disc.service';
import { DiscIlustrationComponent } from '../disc.ilustration.component/disc.ilustration.component';
import { ListDiscComponent } from '../list.disc.component/list.disc.component';
import { CarDisc } from '../../interfaces/car.disc';
import { DesiredDiscComponent } from './desired.disc.component/desired.disc.component';
import { DiscoExistenteComponent } from './existing.disc.component/existing.disc.component';
import { DiscClean } from '../../interfaces/disc.clean';
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
  discoVacio: DiscClean = {
    position: '',
    style: '',
    diameter: 0,
    height: 0,
    thickness: 0,
    pcd: 0,
    holes: 0,
    centerBore: 0,
  };

  discoDeseado = signal<DiscClean>(this.discoVacio);

  discoExistente = signal<DiscClean>(this.discoVacio);

  listDiscCar = signal<CarDisc[] | []>([]);

  recibirDiscoDeseado(disco: DiscClean) {
    this.discoDeseado.set(disco);
  }

  recibirDiscoExistente(disco: DiscClean) {
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
    const discoModificado = this.discService.igualarDatos(
      this.discoExistente(),
      this.discoDeseado(),
    );
    this.discoDeseado.set(discoModificado);
  }
}
