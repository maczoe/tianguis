import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacebookSesionPage } from './facebook-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: FacebookSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacebookSesionPageRoutingModule {}
