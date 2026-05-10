import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
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
  itemChange = output<Brand | Model | null>();
  query = signal<string>('');
  item = input.required<Brand | Model>();
  dataId = Math.random().toString(36).substring(2, 9);

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
    const itemFound = this.items().find(
      (item) => item.name.toLowerCase() === selectedName.toLowerCase(),
    );
    if (itemFound) {
      this.itemChange.emit(itemFound);
      return;
    }
    this.itemChange.emit(null);
  }
}
