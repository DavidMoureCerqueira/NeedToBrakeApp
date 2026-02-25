import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'header-component',
  imports: [],
  templateUrl: './header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
 imageLogoPath :string="images/logo.sf.png";
}
