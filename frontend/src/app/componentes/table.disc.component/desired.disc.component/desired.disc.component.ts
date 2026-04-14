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
    
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;

    this.disco.update((discoActual) => ({
      ...discoActual, 
      [campo]: nuevoValor, 
    }));
    this.discoDeseadoInputeado.emit(this.disco());
  }
  constructor() {
    effect(() => {
      this.disco.set(this.discoModificado());
    });
  }
}
