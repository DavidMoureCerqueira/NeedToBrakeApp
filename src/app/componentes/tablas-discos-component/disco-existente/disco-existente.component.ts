import { Component, input, output, ViewChild } from '@angular/core';
import { TablasComponent } from "../../../shared/tablas/tablas.component";
import { Disco } from '../../../interfaces/disco';

@Component({
  selector: 'disco-existente-component',
  imports: [TablasComponent],
  templateUrl: './disco-existente.component.html',

})
export class DiscoExistenteComponent {

    disco!:Disco
    discoEnviar=output<Disco>();

    recibirDisco(disco:Disco){
      this.disco=disco
      this.discoEnviar.emit(disco)

    }

}

