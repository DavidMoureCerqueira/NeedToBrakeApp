import { Component, effect, input, output, signal, ViewChild } from '@angular/core';
import { DiscClean } from '../../../interfaces/disc.clean';

@Component({
  selector: 'desired-disc',
  imports: [],
  templateUrl: './desired.disc.component.html',
  styleUrl: './desired.disc.component.css',
})
export class DesiredDiscComponent {
  disco = signal<DiscClean>({
    position: '',
    style: '',
    diameter: 0,
    height: 0,
    thickness: 0,
    pcd: 0,
    holes: 0,
    centerBore: 0,
  });

  discoDeseadoInputeado = output<DiscClean>({});
  discoModificado = input.required<DiscClean>({});

  actualizarDisco(campo: keyof DiscClean, nuevoValorTexto: string): void {
    // Convertir el valor a un número. Si no es válido, se usa 0 como fallback.
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;

    // 💡 Actualización de la señal usando la clave dinámica [campo]
    this.disco.update((discoActual) => ({
      ...discoActual, // Mantiene los valores de las otras propiedades
      [campo]: nuevoValor, // Actualiza solo la propiedad especificada
    }));
    this.discoDeseadoInputeado.emit(this.disco());
  }
  constructor() {
    effect(() => {
      this.disco.set(this.discoModificado());
    });
  }
}
