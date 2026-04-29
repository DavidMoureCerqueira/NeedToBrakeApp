import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForumStateService {
  private readonly FORUM_PAGE = 'FORUM_PAGE';
  page = signal<number>(this.getPageInitialValue());
  constructor() {
    effect(() => sessionStorage.setItem(this.FORUM_PAGE, this.page().toString()));
  }

  private getPageInitialValue() {
    const pageStr = sessionStorage.getItem(this.FORUM_PAGE);
    if (!pageStr || !Number(pageStr)) return 1;
    const page = Number(pageStr);
    return page > 0 ? page : 1;
  }
  resetPage() {
    this.page.set(1);
  }
}
