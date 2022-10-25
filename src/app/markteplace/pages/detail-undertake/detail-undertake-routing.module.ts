import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailUndertakePage } from './detail-undertake.page';

const routes: Routes = [
  {
    path: '',
    component: DetailUndertakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailUndertakePageRoutingModule {}
