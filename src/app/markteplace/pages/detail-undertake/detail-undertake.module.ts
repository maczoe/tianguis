import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailUndertakePageRoutingModule } from './detail-undertake-routing.module';

import { DetailUndertakePage } from './detail-undertake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailUndertakePageRoutingModule
  ],
  declarations: [DetailUndertakePage]
})
export class DetailUndertakePageModule {}
