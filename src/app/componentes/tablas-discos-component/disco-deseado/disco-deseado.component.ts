import { Component, input, output, ViewChild } from '@angular/core';
import { TablasComponent } from "../../../shared/tablas/tablas.component";
import { Disco } from '../../../interfaces/disco';

@Component({
  selector: 'disco-deseado-component',
  imports: [TablasComponent],
  templateUrl: './disco-deseado.component.html',

})
export class DiscoDeseadoComponent {

  disco!: Disco;
  discoEnviar = output<Disco>();



  recibirDisco(disco: Disco) {
    this.disco = disco
    this.discoEnviar.emit(disco)

  }

}
