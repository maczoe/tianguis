import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePreviewPageRoutingModule } from './home-preview-routing.module';

import { HomePreviewPage } from './home-preview.page';
import { MarkteplaceModule } from '../markteplace/markteplace.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    HomePreviewPageRoutingModule,
    MarkteplaceModule
  ],
  declarations: [HomePreviewPage]
})
export class HomePreviewPageModule {}
