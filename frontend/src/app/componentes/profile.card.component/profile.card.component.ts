import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'profile-card-component',
  imports: [],
  templateUrl: './profile.card.component.html',
  styleUrl: './profile.card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {}
