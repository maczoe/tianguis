import { SearchComponent } from './components/search/search.component';
import { IonicModule } from '@ionic/angular';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CategoryCardComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoryCardComponent,
    SearchComponent
  ]
})
export class MarkteplaceModule { }
