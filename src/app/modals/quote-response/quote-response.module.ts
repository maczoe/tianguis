import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteResponsePageRoutingModule } from './quote-response-routing.module';

import { QuoteResponsePage } from './quote-response.page';
import { MarkteplaceModule } from 'src/app/markteplace/markteplace.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteResponsePageRoutingModule,
    MarkteplaceModule
  ],
  declarations: [QuoteResponsePage]
})
export class QuoteResponsePageModule {}
