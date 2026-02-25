import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Disco } from '../../interfaces/disco';

@Component({
  selector: 'disco-ilustracion',
  imports: [],
  templateUrl: './disco-ilustracion.html',
  styleUrl: './disco-ilustracion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoIlustracion {


  //  imageIlustration :string="/images/ilustracion.png";

  //   disco = signal<Disco>({
  //   diameter: 0,
  //   height: 0,
  //   thicknessNew: 0,
  //   pcd: 0,
  //   holes: 0,
  //   centerbore: 0,
  //   diameterInterior: 0,
  //   diameterTornillo: 0
  // })
  discoIlustrado = input.required<Disco>({})

  // recibirDisco(){
  //   this.disco.set(this.discoIlustrado())
  // }
}
