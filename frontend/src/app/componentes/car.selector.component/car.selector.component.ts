import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ItemDatalistCarselectorComponent } from '../item.datalist.carselector.component/item.datalist.carselector.component';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';
import { CascadeService } from '../../services/cascade.service';
import { Version } from '../../interfaces/cars/version';
import { Brand } from '../../interfaces/cars/brand';
import { CarClean } from '../../interfaces/cars/car';
import { Model } from '../../interfaces/cars/model';

@Component({
  selector: 'car-selector-component',
  imports: [ItemDatalistCarselectorComponent, FormatVersionPipe],
  templateUrl: './car.selector.component.html',
  styleUrl: './car.selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatVersionPipe],
})
export class CarSelectorComponent {
  cascadeService = inject(CascadeService);
  formatVersion = inject(FormatVersionPipe);
  dataId = Math.random().toString(36).substring(2, 9);

  brands = signal<Brand[]>(this.cascadeService.brands());

  query = signal<string>('');

  carEmitter = output<CarClean>();
  models = computed(() => this.modelResource.value() ?? []);
  versions = computed(() => this.versionResource.value() ?? []);

  car = model<CarClean>({} as CarClean);

  selectedBrand = signal<Brand>(this.car().brand || ({} as Brand));

  selectedModel = signal<Model>(this.car().model || ({} as Model));

  version = signal<Version>(this.car().version || ({} as Version));

  constructor() {
    effect(() => {
      this.selectedBrand.set(this.car().brand || ({} as Brand));
      this.selectedModel.set(this.car().model || ({} as Model));
      this.version.set(this.car().version || ({} as Version));
    });
  }
  modelResource = rxResource({
    params: () => ({ id: this.selectedBrand().id }),
    stream: ({ params }) => {
      if (!params.id) {
        return of([]);
      }
      return this.cascadeService.getModels(params.id);
    },
  });

  versionResource = rxResource({
    params: () => ({ id: this.selectedModel().id }),
    stream: ({ params }) => {
      if (!params.id) {
        return of([]);
      }
      return this.cascadeService.getVersions(params.id);
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
      this.car.set({
        brand: this.selectedBrand(),
        model: this.selectedModel(),
        version: versionFound,
      });

      this.carEmitter.emit(this.car());

      return;
    }
    this.version.set({} as Version);
  }
}
