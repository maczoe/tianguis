import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteResponsePage } from './quote-response.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteResponsePageRoutingModule {}
