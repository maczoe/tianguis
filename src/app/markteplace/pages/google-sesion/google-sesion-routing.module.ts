import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleSesionPage } from './google-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleSesionPageRoutingModule {}
