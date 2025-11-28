import { Component, effect, input, output, signal, ViewChild } from '@angular/core';
import { TablasComponent } from "../../../shared/tablas/tablas.component";
import { Disco } from '../../../interfaces/disco';

@Component({
  selector: 'disco-deseado-component',
  imports: [],
  templateUrl: './disco-deseado.component.html',
  styleUrl: './disco-deseado.component.css',

})
export class DiscoDeseadoComponent {



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

  discoDeseadoInputeado = output<Disco>({})
  discoModificado=input.required<Disco>({})


  actualizarDisco(campo: keyof Disco, nuevoValorTexto: string): void {


    // Convertir el valor a un número. Si no es válido, se usa 0 como fallback.
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;

    // 💡 Actualización de la señal usando la clave dinámica [campo]
    this.disco.update(discoActual => ({
      ...discoActual,          // Mantiene los valores de las otras propiedades
      [campo]: nuevoValor      // Actualiza solo la propiedad especificada
    }));
    this. discoDeseadoInputeado.emit(this.disco())
  }
  constructor(){

    effect(()=>{
      this.disco.set(this.discoModificado())
    })

  }


}
