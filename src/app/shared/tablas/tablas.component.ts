import { Component, computed, effect, input, output, signal } from '@angular/core';
import { Disco } from '../../interfaces/disco';

@Component({
  selector: 'app-tablas',
  imports: [],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css',


})
export class TablasComponent {
  discoCreado = input.required<Disco>();
  discoModificado= output<Disco>()
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

  constructor() {

    effect(() => {
      this.disco.set(this.discoCreado())
    });

  }


  actualizarDisco(campo: keyof Disco, event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    // Convertir el valor a un número. Si no es válido, se usa 0 como fallback.
    const valorParseado = parseFloat(inputElement.value);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;

    // 💡 Actualización de la señal usando la clave dinámica [campo]
    this.disco.update(discoActual => ({
      ...discoActual,          // Mantiene los valores de las otras propiedades
      [campo]: nuevoValor      // Actualiza solo la propiedad especificada
    }));
    this.discoModificado.emit(this.disco())
  }
}


