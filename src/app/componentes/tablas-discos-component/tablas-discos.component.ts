import { Component, inject, ViewChild } from '@angular/core';
import { DiscoDeseadoComponent } from "./disco-deseado/disco-deseado.component";
import { DiscoExistenteComponent } from "./disco-existente/disco-existente.component";
import { DiscoService } from '../../services/disco.service';
import { Disco } from '../../interfaces/disco';


@Component({
  selector: 'tablas-discos-component',
  imports: [DiscoDeseadoComponent, DiscoExistenteComponent],
  templateUrl: './tablas-discos.component.html',
  styleUrl: './tablas-discos.component.css',


})
export class TablasDiscosComponent {


  discService = inject(DiscoService);
  discoDeseado: Disco = {};
  discoExistente: Disco = {};

  recibirDiscoDeseado(disco: Disco) {
    this.discoDeseado = disco
  }

  recibirDiscoExistente(disco: Disco) {
    this.discoExistente = disco
  }

  enviarDiscos() {
    if (!this.discoDeseado || !this.discoExistente) return;
    this.discService.searchDataBase(this.discoExistente, this.discoDeseado)

  }

  igualarDatosVacios() {
    console.log('padre')
    this.discService.igualarDatos(this.discoExistente, this.discoDeseado);
  }


}
