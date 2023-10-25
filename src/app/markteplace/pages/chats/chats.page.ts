import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: any = [];

  constructor(
    private router: Router,
    private chatsService: ChatsService,
    private uiAlerts: UiAlertsService
  ) {
    this.getChats('4565857');
  }

  ngOnInit() {}

  viewRedirect(view: string) {
    this.router.navigateByUrl(view);
  }

  getChats(userId: string) {
    this.chatsService.getChats(userId).then((data) => {
      this.chats = data;
    });
  }
  newchat() {
    this.uiAlerts.alertaInfo('Función no disponible.');
  }
}
