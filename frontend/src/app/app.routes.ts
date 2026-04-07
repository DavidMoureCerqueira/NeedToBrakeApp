import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main.page.component/main.page.component';
import { DiscComparisonPageComponent } from './pages/disc.comparison.page.component/disc.comparison.page.component';

export const routes: Routes = [
  {
    path: '',

    component: MainPageComponent,
  },
  {
    path: 'disc-detail/:id',
    component: DiscComparisonPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
