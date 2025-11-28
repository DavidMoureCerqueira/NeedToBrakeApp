import { Disco } from './../../interfaces/disco';
import { Component, inject, ViewChild, output, signal } from '@angular/core';
import { DiscoDeseadoComponent } from "./disco-deseado/disco-deseado.component";
import { DiscoExistenteComponent } from "./disco-existente/disco-existente.component";
import { DiscoService } from '../../services/disco.service';



@Component({
  selector: 'tablas-discos-component',
  imports: [DiscoDeseadoComponent, DiscoExistenteComponent],
  templateUrl: './tablas-discos.component.html',
  styleUrl: './tablas-discos.component.css',


})
export class TablasDiscosComponent {


  discService = inject(DiscoService);
  discoVacio: Disco = {
    diametro: 0,
    espesor: 0,
    ancho: 0,
    patron: 0,
    numeroagujeros: 0,
    diametroBuje: 0,
    diametroInterior: 0,
    diametroTornillo: 0,
  };

  discoDeseado = signal<Disco>(this.discoVacio)

  discoExistente = signal<Disco>(this.discoVacio);

  // discoIgualado=output<Disco>();


  recibirDiscoDeseado(disco: Disco) {
    this.discoDeseado.set(disco)

  }

  recibirDiscoExistente(disco: Disco) {
    this.discoExistente.set(disco)

  }

  enviarDiscos() {

    if (!this.discoDeseado || !this.discoExistente) return;
    this.discService.searchDataBase(this.discoExistente(), this.discoDeseado())

  }

  igualarDatosVacios() {

    const discoModificado = this.discService.igualarDatos(this.discoExistente(),this.discoDeseado(),this.discoVacio)
    this.discoDeseado.set(discoModificado)

  }
}
