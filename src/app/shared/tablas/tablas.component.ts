import { Component,  output, signal } from '@angular/core';
import { Disco } from '../../interfaces/disco';

@Component({
  selector: 'app-tablas',
  imports: [],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css',


})
export class TablasComponent {



  diametro=signal(0);
  espesor=signal(0);
  ancho=signal(0);
  patron=signal(0);
  agujeros=signal(0);
  buje=signal(0);
  interior=signal(0);
  diametroTornillo=signal(0)


  // discoCreado=output<Disco>();

  crearDisco(){
    const disco:Disco={
      diametro:this.diametro(),
      espesor:this.espesor(),
      ancho:this.ancho(),
      patron:this.patron(),
      numeroagujeros:this.agujeros(),
      diametroBuje: this.buje(),
      diametroInterior: this.interior(),
      diametroTornillo:this.diametroTornillo()
    }
    // this.discoCreado.emit(disco);
    console.log("Shared:", disco)
    return disco;
  }


}
