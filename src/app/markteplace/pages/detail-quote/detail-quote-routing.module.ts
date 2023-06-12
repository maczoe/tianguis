import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailQuotePage } from './detail-quote.page';

const routes: Routes = [
  {
    path: '',
    component: DetailQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailQuotePageRoutingModule {}
