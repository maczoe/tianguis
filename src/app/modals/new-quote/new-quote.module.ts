import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQuotePageRoutingModule } from './new-quote-routing.module';

import { NewQuotePage } from './new-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQuotePageRoutingModule
  ],
  declarations: [NewQuotePage]
})
export class NewQuotePageModule {}
