import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Disc } from '../../interfaces/disco';

@Component({
  selector: 'disc-ilustration',
  imports: [],
  templateUrl: './disc-ilustration.html',
  styleUrl: './disc-ilustration.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscIlustrationComponent {
  discoIlustrado = input.required<Disc>({});
}
