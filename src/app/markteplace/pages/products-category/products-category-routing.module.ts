import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCategoryPage } from './products-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsCategoryPageRoutingModule {}
