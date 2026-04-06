import { Disco } from '../../interfaces/disco';
import { Component, inject, output, signal } from '@angular/core';
import { DiscoDeseadoComponent } from './disco-deseado/disco-deseado.component';
import { DiscoExistenteComponent } from './disco-existente/disco-existente.component';
import { DiscoService } from '../../services/disco.service';
import { DiscoIlustracion } from '../disco-ilustracion/disco-ilustracion';
import { ListadoDiscos } from '../listado-discos/listado-discos';
import { CarDisc } from '../../interfaces/car-disc';
// import { carDisco } from '../../interfaces/coche-disco';

@Component({
  selector: 'tablas-discos-component',
  imports: [DiscoDeseadoComponent, DiscoExistenteComponent, DiscoIlustracion, ListadoDiscos],
  templateUrl: './tablas-discos.component.html',
  styleUrl: './tablas-discos.component.css',
})
export class TablasDiscosComponent {
  discService = inject(DiscoService);
  discoVacio: Disco = {
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

  discoDeseado = signal<Disco>(this.discoVacio);

  discoExistente = signal<Disco>(this.discoVacio);

  listDiscCar = signal<CarDisc[] | []>([]);

  recibirDiscoDeseado(disco: Disco) {
    this.discoDeseado.set(disco);
  }

  recibirDiscoExistente(disco: Disco) {
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
