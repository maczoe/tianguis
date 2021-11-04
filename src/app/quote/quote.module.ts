import { CoreModule } from './../core/core.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotePage } from './quote.page';

import { QuotePageRoutingModule } from './quote-routing.module';
import { MarkteplaceModule } from '../markteplace/markteplace.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CoreModule,
    MarkteplaceModule,
    QuotePageRoutingModule
  ],
  declarations: [QuotePage]
})
export class QuotePageModule {}
