import { CommonModule } from '@angular/common';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { NgModule } from '@angular/core';
import { ChatIconComponent } from './components/chat-icon/chat-icon.component';

@NgModule({
  declarations: [HeaderBarComponent, ChatIconComponent, NotificationIconComponent],
  imports: [IonicModule, CommonModule],
  exports: [HeaderBarComponent, ChatIconComponent, NotificationIconComponent]
})
export class CoreModule {}
