import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteResponsePageRoutingModule } from './quote-response-routing.module';

import { QuoteResponsePage } from './quote-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteResponsePageRoutingModule
  ],
  declarations: [QuoteResponsePage]
})
export class QuoteResponsePageModule {}
