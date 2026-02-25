import { Disco } from '../../../interfaces/disco';
import { Component, effect, input, output, signal } from '@angular/core';



@Component({
  selector: 'disco-existente-component',
  imports: [],
  templateUrl: './disco-existente.component.html',
  styleUrl: './disco-existente.component.css',

})
export class DiscoExistenteComponent {

  disco = signal<Disco>({
    axle: null,
    style: null,
    diameter: 0,
    height: 0,
    thicknessNew: 0,
    thicknessMin: 0,
    pcd: 0,
    holes: 0,
    centerbore: 0,
    diameterInterior: 0,
    diameterTornillo: 0
  })

  discoEnviar = output<Disco>();

  actualizarDisco(campo: keyof Disco, nuevoValorTexto: string) {
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;
    this.disco.update(discoActual => ({
      ...discoActual,
      [campo]: nuevoValor
    }))
    this.discoEnviar.emit(this.disco())
  }

  // constructor() {
  //     // 💡 El effect se axlecuta:
  //     // 1. Inmediatamente al inicio (inicialización)
  //     // 2. Cada vez que el valor de this.discoCreado() cambie (sincronización)
  //     effect(() => {
  //       this.disco.set(this.disco());
  //     });
  //   }


}

