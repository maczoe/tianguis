import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellPage } from '../sell/sell.page';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  { path: 'sell', component: SellPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
