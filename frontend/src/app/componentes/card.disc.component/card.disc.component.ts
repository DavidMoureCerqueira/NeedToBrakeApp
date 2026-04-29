import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { DiscClean } from '../../interfaces/disc/disc.clean';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { KonvaDiscComponent } from '../konva.disc.component/konva.disc.component';
import { KonvaProfileDiscComponent } from '../konva.profile.disc.component/konva.profile.disc.component';
import { DiscTheme, THEMES } from '../../styles/discThemes';

@Component({
  selector: 'card-disc-component',
  imports: [KeyValuePipe, TitleCasePipe, KonvaDiscComponent, KonvaProfileDiscComponent],
  templateUrl: './card.disc.component.html',
  styleUrl: './card.disc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDiscComponent {
  title = input.required<string>();
  disc = input.required<DiscClean>();
  isWarning = signal<boolean>(false);
  themeName = input.required<DiscTheme>();
  theme = computed(() => THEMES[this.themeName()]);
}
