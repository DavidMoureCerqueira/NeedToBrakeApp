import { Component } from '@angular/core';
import { TableDiscComponent } from '../../componentes/table.disc.component/table.disc.component';

@Component({
  selector: 'select-disc-page',
  imports: [TableDiscComponent],
  templateUrl: './select.disc.page.component.html',
  styleUrl: 'select.disc.page.component.css',
})
export class SelectDiscPageComponent {
  imageLogoPath: string = 'images/logo.sf.png';
  imageFondoPath: string = "'/images/fondoHeader.jpg'";
}
