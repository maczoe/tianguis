import { CoreModule } from './../core/core.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponsPage } from './coupons.page';

import { CouponsPageRoutingModule } from './coupons-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CouponsPageRoutingModule,
    CoreModule
  ],
  declarations: [CouponsPage]
})
export class CouponsPageModule {}
