import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CoreModule } from '../core/core.module';
import { MarkteplaceModule } from '../markteplace/markteplace.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    CoreModule,
    MarkteplaceModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
