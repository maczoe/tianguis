import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsCategoryPageRoutingModule } from './products-category-routing.module';

import { ProductsCategoryPage } from './products-category.page';
import { MarkteplaceModule } from '../../markteplace.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsCategoryPageRoutingModule,
    MarkteplaceModule
  ],
  declarations: [ProductsCategoryPage]
})
export class ProductsCategoryPageModule {}
