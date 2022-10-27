import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacebookSesionPageRoutingModule } from './facebook-sesion-routing.module';

import { FacebookSesionPage } from './facebook-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacebookSesionPageRoutingModule
  ],
  declarations: [FacebookSesionPage]
})
export class FacebookSesionPageModule {}
