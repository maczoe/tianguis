import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailResponseQuotePageRoutingModule } from './detail-response-quote-routing.module';

import { DetailResponseQuotePage } from './detail-response-quote.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    DetailResponseQuotePageRoutingModule
  ],
  declarations: [DetailResponseQuotePage]
})
export class DetailResponseQuotePageModule {}
