import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePreviewPage } from './home-preview.page';

const routes: Routes = [
  {
    path: '',
    component: HomePreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePreviewPageRoutingModule {}
