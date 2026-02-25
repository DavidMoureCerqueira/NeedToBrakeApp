import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
year:number=new Date().getFullYear();
}
