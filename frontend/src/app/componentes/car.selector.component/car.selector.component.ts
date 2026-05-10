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
import { ItemVersionDatalistCarselectorComponent } from '../item.version.datalist.carselector.component/item.version.datalist.carselector.component';

@Component({
  selector: 'car-selector-component',
  imports: [
    ItemDatalistCarselectorComponent,
    FormatVersionPipe,
    ItemVersionDatalistCarselectorComponent,
  ],
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

  selectedBrand = computed(() => this.car().brand || ({} as Brand));

  selectedModel = computed(() => this.car().model || ({} as Model));

  version = computed(() => this.car().version || ({} as Version));

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

  onBrandSelected(brand: Brand | null) {
    this.car.update((current) => ({
      ...current,
      brand: brand || ({} as Brand),
      model: {} as Model,
      version: {} as Version,
    }));
  }
  onModelSelected(model: Model | null) {
    this.car.update((current) => ({
      ...current,
      model: model || ({} as Model),
      version: {} as Version,
    }));
  }
  onVersionSelected(version: Version | null) {
    this.car.update((current) => ({
      ...current,
      version: version || ({} as Version),
    }));
    this.carEmitter.emit(this.car());
    console.log(this.car());
  }
}
