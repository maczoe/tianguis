import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    SellPageRoutingModule
  ],
  declarations: [SellPage]
})
export class SellPageModule {}
