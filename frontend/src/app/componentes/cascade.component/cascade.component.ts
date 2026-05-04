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
import { ItemDatalistCarselectorComponent } from '../item.datalist.carselector.component/item.datalist.carselector.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';
import { Version } from '../../interfaces/cars/version';
import { DiscApiService } from '../../services/disc.api.service';

@Component({
  selector: 'cascade-component',
  imports: [ItemDatalistCarselectorComponent, FormatVersionPipe],
  templateUrl: './cascade.component.html',
  styleUrl: './cascade.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatVersionPipe],
})
export class CascadeComponent {
  formatVersion = inject(FormatVersionPipe);
  theme = input.required<DiscTheme>();
  disc = model<Disc>();
  cascadeService = inject(CascadeService);
  discApiService = inject(DiscApiService);
  brands = signal<Brand[]>(this.cascadeService.brands());
  query = signal<string>('');
  selectedBrandId = signal<number | null>(null);
  selectedModelId = signal<number | null>(null);
  models = computed(() => this.modelResource.value() ?? []);
  versions = computed(() => this.versionResource.value() ?? []);
  version = signal<Version | null>(null);
  dataId = Math.random().toString(36).substring(2, 9);
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
  modelResource = rxResource({
    params: () => ({ id: this.selectedBrandId() }),
    stream: ({ params }) => {
      if (!params.id) {
        return of([]);
      }
      return this.cascadeService.getModels(params.id);
    },
  });

  onSelectedBrand(brandId: number) {
    if (brandId === 0) {
      this.selectedBrandId.set(null);
      return;
    }
    this.selectedBrandId.set(brandId);
  }
  onSelectedModel(modelId: number) {
    this.selectedModelId.set(modelId);
  }
  versionResource = rxResource({
    params: () => ({ id: this.selectedModelId() }),
    stream: ({ params }) => {
      if (!params.id) {
        return of([]);
      }
      return this.cascadeService.getVersions(params.id);
    },
  });
  discResource = rxResource({
    params: () => ({ idVersion: this.version()?.id }),
    stream: ({ params }) => {
      if (!params.idVersion) {
        return of([]);
      }
      return this.discApiService.getDiscsByVersionID(params.idVersion);
    },
  });

  onSearchInput(event: Event) {
    const queryData = event.target as HTMLInputElement;
    this.query.set(queryData.value);
  }
  onSelectVersion(event: Event) {
    const input = event.target as HTMLInputElement;
    this.validateAndLoad(input.value);
  }
  onEnterPressed(event: Event) {
    const input = event.target as HTMLInputElement;
    this.validateAndLoad(input.value);
    input.blur();
  }
  private validateAndLoad(value: string) {
    const selectedName = value.trim();
    const versionFound = this.versions().find(
      (version) => this.formatVersion.transform(version) === selectedName,
    );
    if (versionFound) {
      this.version.set(versionFound);
      return;
    }
    this.version.set(null);
  }

  togglePosition(pos: 'front' | 'rear') {
    if (this.position() !== pos) {
      this.position.set(pos);
    }
    console.log('posicion', this.position());
  }
}
