import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { DiscClean } from '../../interfaces/disc.clean';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'card-disc-component',
  imports: [KeyValuePipe, TitleCasePipe],
  templateUrl: './card.disc.component.html',
  styleUrl: './card.disc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDiscComponent {
  title = input.required<string>();
  disc = input.required<DiscClean | null>();
}
