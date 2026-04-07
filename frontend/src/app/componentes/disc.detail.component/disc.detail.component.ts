import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { FooterComponent } from '../../shared/footer-component/footer-component';

@Component({
  selector: 'disc-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './disc.detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoDetailComponent {}
