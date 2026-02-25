import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component/main-page.component';
import { DiscoDetail as DiscoDetailComponent } from './componentes/disco-detail/disco-detail';

export const routes: Routes = [

  {
    path:'',

    component:MainPageComponent
  },
  {
    path:'disc-detail/:id',
    component:DiscoDetailComponent
  },
  {
    path:'**',
    redirectTo:''
  },


];
