import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileCardComponent } from '../../componentes/profile.card.component/profile.card.component';

@Component({
  selector: 'app-profile.page.component',
  imports: [ProfileCardComponent],
  templateUrl: './profile.page.component.html',
  styleUrl: './profile.page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {}
