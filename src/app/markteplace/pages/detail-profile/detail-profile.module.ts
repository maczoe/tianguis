import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProfilePageRoutingModule } from './detail-profile-routing.module';

import { DetailProfilePage } from './detail-profile.page';
import { CoreModule } from 'src/app/core/core.module';
import { MarkteplaceModule } from '../../markteplace.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    DetailProfilePageRoutingModule,
    MarkteplaceModule
  ],
  declarations: [DetailProfilePage ]
})
export class DetailProfilePageModule {}
