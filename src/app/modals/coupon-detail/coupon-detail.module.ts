import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponDetailPageRoutingModule } from './coupon-detail-routing.module';

import { CouponDetailPage } from './coupon-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponDetailPageRoutingModule
  ],
  declarations: [CouponDetailPage]
})
export class CouponDetailPageModule {}
