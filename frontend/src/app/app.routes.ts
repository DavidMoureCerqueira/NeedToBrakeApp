import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main.page.component/main.page.component';
import { DiscComparisonPageComponent } from './pages/disc.comparison.page.component/disc.comparison.page.component';
import { RegisterPageComponent } from './pages/register.page.component/register.page.component';
import { SinginPageComponent } from './componentes/singin.page.component/singin.page.component';

export const routes: Routes = [
  {
    path: '',

    component: MainPageComponent,
  },
  {
    path: 'disc-comparison/:id',
    component: DiscComparisonPageComponent,
  },
  {
    path: 'login',
    component: RegisterPageComponent,
  },
  {
    path: 'sign-in',
    component: SinginPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
