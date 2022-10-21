import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsCategoryPageRoutingModule } from './products-category-routing.module';

import { ProductsCategoryPage } from './products-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsCategoryPageRoutingModule
  ],
  declarations: [ProductsCategoryPage]
})
export class ProductsCategoryPageModule {}
