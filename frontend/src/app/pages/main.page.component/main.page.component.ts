import { HeaderComponent } from '../../shared/header-component/header-component';
import { Component } from '@angular/core';

import { FooterComponent } from '../../shared/footer-component/footer-component';
import { TableDiscComponent } from '../../componentes/table.disc.component/table.disc.component';

@Component({
  selector: 'app-main-page',
  imports: [TableDiscComponent, HeaderComponent, FooterComponent],
  templateUrl: './main.page.component.html',
  styleUrl: 'main.page.component.css',
})
export class MainPageComponent {
  imageLogoPath: string = 'images/logo.sf.png';
  imageFondoPath: string = "'/images/fondoHeader.jpg'";
}
