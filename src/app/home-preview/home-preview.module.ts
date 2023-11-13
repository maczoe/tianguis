import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePreviewPageRoutingModule } from './home-preview-routing.module';

import { HomePreviewPage } from './home-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePreviewPageRoutingModule
  ],
  declarations: [HomePreviewPage]
})
export class HomePreviewPageModule {}
