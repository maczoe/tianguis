import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatListPageRoutingModule } from './chat-list-routing.module';

import { ChatListPage } from './chat-list.page';
import {AutosizeModule} from 'ngx-autosize';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatListPageRoutingModule,
    AutosizeModule
  ],
  declarations: [ChatListPage]
})
export class ChatListPageModule {}
