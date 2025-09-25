import { Component, input, output, ViewChild } from '@angular/core';
import { TablasComponent } from "../../../shared/tablas/tablas.component";
import { Disco } from '../../../interfaces/disco';

@Component({
  selector: 'disco-existente-component',
  imports: [TablasComponent],
  templateUrl: './disco-existente.component.html',

})
export class DiscoExistenteComponent {

    @ViewChild(TablasComponent)lector!:TablasComponent

//   disco!:Disco
//   discoEnviar=output<Disco>();


// // crearDisco():Disco{
// //     return this.disco ?? {}
// //   }

lectorDisco(){
  const discoCreado:Disco = this.lector.crearDisco();
  // this.recibirDisco(discoCreado);

  console.log("Lector de disco: ", discoCreado)
  return discoCreado;
}





// recibirDisco(disco:Disco){
//   this.disco=disco
//   this.discoEnviar.emit(disco)
//   console.log("DiscoEnviado", disco)
// }


}

