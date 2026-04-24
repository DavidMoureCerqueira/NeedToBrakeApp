import { Routes } from '@angular/router';
import { SelectDiscPageComponent } from './pages/select.disc.page.component/select.disc..page.component';
import { DiscComparisonPageComponent } from './pages/disc.comparison.page.component/disc.comparison.page.component';
import { RegisterPageComponent } from './pages/register.page.component/register.page.component';
import { SinginPageComponent } from './pages/singin.page.component/singin.page.component';
import { authGuard } from './guards/auth-guard';
import { ProfilePageComponent } from './pages/profile.page.component/profile.page.component';
import { ForumPageComponent } from './pages/forum.page.component/forum.page.component';
import { profileResolver } from './resolver/profile-resolver';
import { MaintenancePageComponent } from './pages/mantenance.page.component/maintenance.page.component';

export const routes: Routes = [
  // 1. LANDING / HOME
  // {
  //   path: '',
  //   component: MainPageComponent,
  //   data: {
  //     title: 'NeedToBrake - Comparador de Discos',
  //     searchPost: false,
  //     showLogout:false,
  //   },
  // },
  {
    // TODO:cambiar el path para que no sea la principal
    path: '',
    component: SelectDiscPageComponent,
    title: 'Choose disc - NeedToBrake',
    data: {
      searchPost: false,
    },
  },
  {
    path: 'disc-comparison/:id',
    component: DiscComparisonPageComponent,
    title: 'Comparing... - NeedToBrake',
    data: {
      searchPost: false,
    },
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register - NeedToBrake',
    data: {
      searchPost: false,
    },
  },
  {
    path: 'sign-in',
    component: SinginPageComponent,

    title: 'Welcome Back - NeedToBrake',
    data: {
      searchPost: false,
    },
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
    canActivate: [authGuard],
    title: 'My profile - NeedToBrake',
    data: {
      searchPost: false,
      showLogout: true,
    },
    resolve: {
      profile: profileResolver,
    },
  },
  {
    path: 'forum',
    component: ForumPageComponent,
    title: 'Forum - NeedToBrake',
    data: {
      searchPost: true,

      actionText: 'New Post',
    },
  },
  // {
  //   path: 'forum/post/:id',
  //   component: ForumPageComponent,
  //   data: {
  //     title: 'Forum - NeedToBrake',
  //     searchPost: false,
  //     actionText: 'Back to forum',
  //   },
  // },
  {
    path: 'maintenance',
    component: MaintenancePageComponent,
    title: 'Maintenance - NeedToBrake',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
