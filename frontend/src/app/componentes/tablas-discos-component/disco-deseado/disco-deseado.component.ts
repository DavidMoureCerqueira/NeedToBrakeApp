import { Component, effect, input, output, signal, ViewChild } from '@angular/core';
import { Disco } from '../../../interfaces/disco';

@Component({
  selector: 'disco-deseado-component',
  imports: [],
  templateUrl: './disco-deseado.component.html',
  styleUrl: './disco-deseado.component.css',

})
export class DiscoDeseadoComponent {



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

  discoDeseadoInputeado = output<Disco>({})
  discoModificado = input.required<Disco>({})


  actualizarDisco(campo: keyof Disco, nuevoValorTexto: string): void {


    // Convertir el valor a un número. Si no es válido, se usa 0 como fallback.
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;

    // 💡 Actualización de la señal usando la clave dinámica [campo]
    this.disco.update(discoActual => ({
      ...discoActual,          // Mantiene los valores de las otras propiedades
      [campo]: nuevoValor      // Actualiza solo la propiedad especificada
    }));
    this.discoDeseadoInputeado.emit(this.disco())
  }
  constructor() {

    effect(() => {
      this.disco.set(this.discoModificado())
    })

  }


}
