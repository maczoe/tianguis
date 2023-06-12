import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailQuotePageRoutingModule } from './detail-quote-routing.module';

import { DetailQuotePage } from './detail-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailQuotePageRoutingModule
  ],
  declarations: [DetailQuotePage]
})
export class DetailQuotePageModule {}
