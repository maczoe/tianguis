import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPreviewPageRoutingModule } from './tabs-preview-routing.module';

import { TabsPreviewPage } from './tabs-preview.page';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPreviewPageRoutingModule,
    CoreModule
  ],
  declarations: [TabsPreviewPage]
})
export class TabsPreviewPageModule {}
