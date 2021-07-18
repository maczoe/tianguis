import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'quote',
        loadChildren: () =>
          import('../quote/quote.module').then((m) => m.QuotePageModule),
      },
      {
        path: 'coupons',
        loadChildren: () =>
          import('../coupons/coupons.module').then((m) => m.CouponsPageModule),
      },
      {
        path: 'sell',
        loadChildren: () =>
          import('../sell/sell.module').then((m) => m.SellPageModule),
      },
      {
        path: 'work',
        loadChildren: () =>
          import('../work/work.module').then((m) => m.WorkPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
