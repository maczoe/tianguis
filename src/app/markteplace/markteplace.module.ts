import { SearchComponent } from './components/search/search.component';
import { IonicModule } from '@ionic/angular';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    CategoryCardComponent,
    CategoryListComponent,
    ProductCardComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule

  ],
  exports: [
    CategoryCardComponent,
    CategoryListComponent,
    ProductCardComponent,

    SearchComponent
  ]
})
export class MarkteplaceModule { }
