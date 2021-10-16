import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProfilePageRoutingModule } from './detail-profile-routing.module';

import { DetailProfilePage } from './detail-profile.page';
import { CoreModule } from 'src/app/core/core.module';
import { ProductCardComponent } from '../../components/product-card/product-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    DetailProfilePageRoutingModule,
  ],
  declarations: [DetailProfilePage]
})
export class DetailProfilePageModule {}
