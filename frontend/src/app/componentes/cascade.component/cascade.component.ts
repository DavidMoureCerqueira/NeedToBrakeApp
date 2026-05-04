import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';

import { Brand } from '../../interfaces/cars/brand';
import { Disc } from '../../interfaces/disc/disc';
import { CascadeService } from '../../services/cascade.service';
import { DiscTheme } from '../../styles/discThemes';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';
import { DiscApiService } from '../../services/disc.api.service';
import { CarSelectorComponent } from '../../car.selector.component/car.selector.component';

@Component({
  selector: 'cascade-component',
  imports: [CarSelectorComponent],
  templateUrl: './cascade.component.html',
  styleUrl: './cascade.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatVersionPipe],
})
export class CascadeComponent {
  theme = input.required<DiscTheme>();
  disc = model<Disc>();
  cascadeService = inject(CascadeService);
  discApiService = inject(DiscApiService);
  brands = signal<Brand[]>(this.cascadeService.brands());
  idVersion = signal<number | null>(null);
  position = signal<'front' | 'rear'>('front');
  discOptions = computed(() => this.discResource.value());
  constructor() {
    effect(() => {
      const list = this.discOptions();
      const pos = this.position();
      const matchingDisc = list?.find((disc) => disc.disc.position === pos);
      if (matchingDisc) {
        untracked(() => {
          this.disc.set(matchingDisc.disc);
        });
      }
    });
  }

  discResource = rxResource({
    params: () => ({ idVersion: this.idVersion() }),
    stream: ({ params }) => {
      if (!params.idVersion) {
        return of([]);
      }
      return this.discApiService.getDiscsByVersionID(params.idVersion);
    },
  });

  onVersionIDReceiver(id: number) {
    this.idVersion.set(id);
  }

  togglePosition(pos: 'front' | 'rear') {
    if (this.position() !== pos) {
      this.position.set(pos);
    }
    console.log('posicion', this.position());
  }
}
