import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header-component/header-component";
import { FooterComponent } from "../../shared/footer-component/footer-component";

@Component({
  selector: 'disco-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './disco-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoDetail { }
