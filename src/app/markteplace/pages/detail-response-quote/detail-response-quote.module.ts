import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailResponseQuotePageRoutingModule } from './detail-response-quote-routing.module';

import { DetailResponseQuotePage } from './detail-response-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailResponseQuotePageRoutingModule
  ],
  declarations: [DetailResponseQuotePage]
})
export class DetailResponseQuotePageModule {}
