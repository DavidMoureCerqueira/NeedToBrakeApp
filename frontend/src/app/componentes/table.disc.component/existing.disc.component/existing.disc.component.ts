import { DiscClean } from '../../../interfaces/disc/disc.clean';
import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'existing-disc',
  imports: [],
  templateUrl: './existing.disc.component.html',
  styleUrl: './existing.disc.component.css',
})
export class DiscoExistenteComponent {
  disc = signal<DiscClean>({
    position: '',
    style: '',
    diameter: 0,
    height: 0,
    thickness: 0,
    pcd: 0,
    holes: 0,
    centerBore: 0,
  });

  discoEnviar = output<DiscClean>();

  actualizarDisco(campo: keyof DiscClean, nuevoValorTexto: string) {
    const valorParseado = parseFloat(nuevoValorTexto);
    const nuevoValor = isNaN(valorParseado) ? 0 : valorParseado;
    this.disc.update((actualDisc) => ({
      ...actualDisc,
      [campo]: nuevoValor,
    }));
    this.discoEnviar.emit(this.disc());
  }
}
