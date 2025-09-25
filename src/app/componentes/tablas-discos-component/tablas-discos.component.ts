import { Component, inject, ViewChild } from '@angular/core';
import { DiscoDeseadoComponent } from "./disco-deseado/disco-deseado.component";
import { DiscoExistenteComponent } from "./disco-existente/disco-existente.component";
import { DiscoService } from '../../services/disco.service';
import { Disco } from '../../interfaces/disco';


@Component({
  selector: 'tablas-discos-component',
  imports: [DiscoDeseadoComponent, DiscoExistenteComponent],
  templateUrl: './tablas-discos.component.html',

})
export class TablasDiscosComponent {
  @ViewChild(DiscoDeseadoComponent)discoDeseadoLector!:DiscoDeseadoComponent
  @ViewChild(DiscoExistenteComponent)discoExistenteLector!:DiscoExistenteComponent
  constructor() { }

  discService=inject(DiscoService);
  discoDeseado:Disco={};
  discoExistente:Disco={};

  // recibirDiscoDeseado(disco: Disco){
  //   this.discoDeseado=disco

  //     console.log("Disco deseado recibido en padre",disco)
  // }

  // recibirDiscoExistente(disco: Disco){
  //   this.discoExistente=disco
  //       console.log("Disco actual recibido en padre",disco)
  // }

  enviarDiscos() {
    this.discoDeseado=(this.discoDeseadoLector.lectorDisco())
    this.discoExistente=(this.discoExistenteLector.lectorDisco())

    //if(!this.discoDeseado||!this.discoExistente) return;
    this.discService.searchDataBase(this.discoExistente, this.discoDeseado)

   }

}
