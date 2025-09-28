import { Component,  computed,  effect,  output, signal } from '@angular/core';
import { Disco } from '../../interfaces/disco';

@Component({
  selector: 'app-tablas',
  imports: [],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css',


})
export class TablasComponent {
  discoCreado=output<Disco>();

  disco={
    diametro:signal(0),
    espesor:signal(0),
    ancho:signal(0),
    patron:signal(0),
    agujeros:signal(0),
    buje:signal(0),
    interior:signal(0),
    diametroTornillo:signal(0)
  }

  discoCompleto=computed(()=>({
    diametro:this.disco.diametro(),
    espesor:this.disco.espesor(),
    ancho:this.disco.ancho(),
    patron:this.disco.patron(),
    agujeros:this.disco.agujeros(),
    buje:this.disco.buje(),
    interior:this.disco.interior(),
    diametroTornillo:this.disco.diametroTornillo(),
  }))
  constructor(){

    effect(()=>{
      this.discoCreado.emit(this.discoCompleto())
    });

  }


}
