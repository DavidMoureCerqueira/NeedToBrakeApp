import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  headerConfig = signal({
    searchPost: false,
    actionText: null as string | null,
    showLogout: false,
  });
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRouter.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route?.snapshot.data;
        }),
      )
      .subscribe((data) => {
        if (data) {
          this.headerConfig.set({
            searchPost: !!data['searchPost'],
            actionText: data['actionText'] || null,
            showLogout: data['showLogout'] || false,
          });
        }
      });
  }
}
