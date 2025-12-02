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
  //   diametro: 0,
  //   espesor: 0,
  //   ancho: 0,
  //   patron: 0,
  //   numeroagujeros: 0,
  //   diametroBuje: 0,
  //   diametroInterior: 0,
  //   diametroTornillo: 0
  // })
  discoIlustrado=input.required<Disco>({})

  // recibirDisco(){
  //   this.disco.set(this.discoIlustrado())
  // }
 }
