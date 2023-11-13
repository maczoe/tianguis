import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPreviewPage } from './tabs-preview.page';
import { LoginPage } from '../auth/login/login.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPreviewPage,
    children :[
      {
        path: 'home-preview',
        loadChildren: () =>
          import('../home-preview/home-preview.module').then((m) => m.HomePreviewPageModule),
      },
      {
        path: 'launch',
        loadChildren: () =>
          import('../launch/launch.module').then((m) => m.LaunchPageModule),
      },
      {
        path: 'login',
        redirectTo: '/login',
      },
      {
        path: '',
        redirectTo: 'home-preview',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home-preview',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPreviewPageRoutingModule {}
