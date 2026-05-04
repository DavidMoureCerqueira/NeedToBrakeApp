import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
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
  selectedBrandId = signal<number | null>(null);
  selectedModelId = signal<number | null>(null);
  idEmitter = output<number>();
  models = computed(() => this.modelResource.value() ?? []);
  versions = computed(() => this.versionResource.value() ?? []);
  version = signal<Version | null>(null);
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
      this.idEmitter.emit(versionFound.id);
      return;
    }
    this.version.set(null);
  }
}
