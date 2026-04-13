import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main.page.component/main.page.component';
import { DiscComparisonPageComponent } from './pages/disc.comparison.page.component/disc.comparison.page.component';
import { RegisterPageComponent } from './pages/register.page.component/register.page.component';
import { SinginPageComponent } from './pages/singin.page.component/singin.page.component';
import { authGuard } from './guards/auth-guard';
import { ProfilePageComponent } from './pages/profile.page.component/profile.page.component';

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
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'sign-in',
    component: SinginPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
