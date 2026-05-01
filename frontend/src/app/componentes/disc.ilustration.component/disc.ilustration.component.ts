import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Disc } from '../../interfaces/disc/disc';

@Component({
  selector: 'disc-ilustration',
  imports: [],
  templateUrl: './disc.ilustration.component.html',
  styleUrl: './disc.ilustration.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscIlustrationComponent {
  discoIlustrado = input.required<Disc>({});
}
