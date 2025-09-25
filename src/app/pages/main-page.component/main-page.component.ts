import {Component } from '@angular/core';
import { TablasDiscosComponent } from '../../componentes/tablas-discos-component/tablas-discos.component';


@Component({
  selector: 'app-main-page',
  imports: [TablasDiscosComponent],
  templateUrl: './main-page.component.html',
  styleUrl:'main-page.component.css'

})
export class MainPageComponent {

  imageLogoPath :string="images/logo.sf.png";
  imageFondoPath :string="'/images/fondoHeader.jpg'";


}
