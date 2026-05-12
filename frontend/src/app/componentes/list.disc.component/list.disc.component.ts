import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormatPCDPipe } from '../../pipes/format.pcd.pipe';
import { FormatMMPipe } from '../../pipes/format.mm.pipe';
import { TitleCasePipe } from '@angular/common';
import { FormatCarPipe } from '../../pipes/format.car.pipe';
import { DiscApiService } from '../../services/disc.api.service';
@Component({
  selector: 'list-disc',
  imports: [RouterLink, FormatPCDPipe, FormatMMPipe, TitleCasePipe, FormatCarPipe],
  templateUrl: './list.disc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatCarPipe],
})
export class ListDiscComponent {
  discApiService = inject(DiscApiService);
  querySearch = signal<string>('');
  carPipe = inject(FormatCarPipe);

  resultsList = viewChild<ElementRef>('resultsList');

  constructor() {
    effect(() => {
      const element = this.resultsList()?.nativeElement;

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        element.focus();
      }
    });
  }

  filteredDiscList = computed(() => {
    const listResource = this.discApiService.filteredDiscResource;
    if (listResource.error()) {
      return [];
    }
    const query = this.querySearch().toLowerCase().trim();
    const baseList = listResource.value();
    if (!query) return baseList;
    return baseList?.filter((disc) => {
      return this.carPipe.transform(disc.car).toLowerCase().includes(query);
    });
  });
}
