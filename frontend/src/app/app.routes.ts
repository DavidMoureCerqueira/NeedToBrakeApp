import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component/main-page.component';
import { DiscoDetailComponent } from './componentes/disc.detail.component/disc.detail.component';

export const routes: Routes = [
  {
    path: '',

    component: MainPageComponent,
  },
  {
    path: 'disc-detail/:id',
    component: DiscoDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
