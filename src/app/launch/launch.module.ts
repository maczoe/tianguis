import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaunchPageRoutingModule } from './launch-routing.module';

import { LaunchPage } from './launch.page';
import { MarkteplaceModule } from '../markteplace/markteplace.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    LaunchPageRoutingModule,
    MarkteplaceModule
  ],
  declarations: [LaunchPage]
})
export class LaunchPageModule {}
