import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Version } from '../../interfaces/cars/version';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';

@Component({
  selector: 'app-item-version-datalist-carselector-component',
  imports: [FormatVersionPipe],
  templateUrl: './item.version.datalist.carselector.component.html',
  styleUrl: './item.version.datalist.carselector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatVersionPipe],
})
export class ItemVersionDatalistCarselectorComponent {
  items = input.required<Version[]>();
  itemChange = output<Version | null>();
  query = signal<string>('');
  formatVersion = inject(FormatVersionPipe);
  item = input.required<Version>();
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
    const selectedVersion = value.trim();
    const itemFound = this.items().find(
      (item) => this.formatVersion.transform(item).toLowerCase() === selectedVersion.toLowerCase(),
    );
    if (itemFound) {
      this.isValid.set(true);
      this.itemChange.emit(itemFound);
      return;
    }
    this.isValid.set(false);
    this.itemChange.emit(null);
  }
}
