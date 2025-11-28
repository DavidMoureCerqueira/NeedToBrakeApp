import { Disco } from './../../../interfaces/disco';
import { Component, effect, input, output, signal, ViewChild } from '@angular/core';
import { TablasComponent } from "../../../shared/tablas/tablas.component";


@Component({
  selector: 'disco-existente-component',
  imports: [],
  templateUrl: './disco-existente.component.html',
  styleUrl: './disco-existente.component.css',

})
export class DiscoExistenteComponent {

  disco = signal<Disco>({
    diametro: 0,
    espesor: 0,
    ancho: 0,
    patron: 0,
    numeroagujeros: 0,
    diametroBuje: 0,
    diametroInterior: 0,
    diametroTornillo: 0
  })

  discoEnviar = output<Disco>();

  actualizarDisco(campo:keyof Disco, nuevoValorTexto:string){
    const valorParseado=parseFloat(nuevoValorTexto);
    const nuevoValor=isNaN(valorParseado)? 0:valorParseado;
    this.disco.update(discoActual=>({
      ...discoActual,
      [campo]:nuevoValor
    }))
    this.discoEnviar.emit(this.disco())
  }

// constructor() {
//     // 💡 El effect se ejecuta:
//     // 1. Inmediatamente al inicio (inicialización)
//     // 2. Cada vez que el valor de this.discoCreado() cambie (sincronización)
//     effect(() => {
//       this.disco.set(this.disco());
//     });
//   }


}

