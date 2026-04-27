import { Routes } from '@angular/router';
import { SelectDiscPageComponent } from './pages/select.disc.page.component/select.disc..page.component';
import { DiscComparisonPageComponent } from './pages/disc.comparison.page.component/disc.comparison.page.component';
import { RegisterPageComponent } from './pages/auth/register.page.component/register.page.component';
import { SigninPageComponent } from './pages/auth/signin.page.component/signin.page.component';
import { authGuard } from './guards/auth-guard';
import { ProfilePageComponent } from './pages/profile.page.component/profile.page.component';
import { ForumPageComponent } from './pages/forum/forum.page.component/forum.page.component';
import { profileResolver } from './resolver/profile-resolver';
import { MaintenancePageComponent } from './pages/maintenance.page.component/maintenance.page.component';
import { forumResolver } from './resolver/forum-resolver';
import { PostCreationPageComponent } from './pages/forum/post.creation.page.component/post.creation.page.component';
import path from 'path';
import { PostDetailComponent } from './pages/forum/post.detail.component/post.detail.component';

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
    component: SigninPageComponent,

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
    resolve: {
      profile: profileResolver,
    },
  },
  {
    path: 'forum',
    children: [
      {
        path: '',
        component: ForumPageComponent,
        title: 'Forum - NeedToBrake',
        resolve: {
          forum: forumResolver,
        },
      },

      {
        path: 'post/create',
        component: PostCreationPageComponent,
        canActivate: [authGuard],
        title: 'Write your experience - NeedToBrake',
      },
      {
        path: 'post/:id',
        component: PostDetailComponent,
        title: 'Post detail - NeedToBrake',
      },
    ],
  },
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
