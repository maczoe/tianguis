import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleSesionPageRoutingModule } from './google-sesion-routing.module';

import { GoogleSesionPage } from './google-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleSesionPageRoutingModule
  ],
  declarations: [GoogleSesionPage]
})
export class GoogleSesionPageModule {}
