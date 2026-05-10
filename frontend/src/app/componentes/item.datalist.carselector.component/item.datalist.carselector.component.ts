import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Brand } from '../../interfaces/cars/brand';
import { Model } from '../../interfaces/cars/model';

@Component({
  selector: 'item-datalist-carselector-component',
  imports: [],
  templateUrl: './item.datalist.carselector.component.html',
  styleUrl: './item.datalist.carselector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDatalistCarselectorComponent {
  items = input.required<Brand[] | Model[]>();

  query = signal<string>('');

  item = model<Brand | Model>();
  dataId = Math.random().toString(36).substring(2, 9);
  isValid = signal<boolean>(false);

  onSearchInput(event: Event) {
    const queryData = event.target as HTMLInputElement;
    this.query.set(queryData.value);
  }
  onSelectOption(event: Event) {
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
    const itemFound = this.items().find((item) => item.name === selectedName);
    if (itemFound) {
      this.item.set(itemFound);
      this.isValid.set(true);
      return;
    }
    this.isValid.set(false);
  }
}
