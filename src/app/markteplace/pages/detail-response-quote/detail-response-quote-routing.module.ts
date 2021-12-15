import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailResponseQuotePage } from './detail-response-quote.page';

const routes: Routes = [
  {
    path: '',
    component: DetailResponseQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailResponseQuotePageRoutingModule {}
