import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  pagination = input.required<{ currentPage: number; pages: number; hasNext: boolean }>();
  pageChanger = output<number>();

  changePage(page: number) {
    if (page < 1 || page === this.pagination().currentPage || page > this.pagination().pages)
      return;

    this.pageChanger.emit(page);
  }
}
