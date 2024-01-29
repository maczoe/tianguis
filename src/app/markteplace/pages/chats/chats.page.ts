import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { ChatsService } from '../../services/chats.service';
import { Chat } from '../../model/chat';
import { ProfilesService } from '../../services/profiles.service';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: Chat[] = [];

  constructor(
    private router: Router,
    private chatsService: ChatsService,
    private profilesService: ProfilesService,
    private uiAlerts: UiAlertsService
  ) {
    this.getChats('4565857');
  }

  ngOnInit() {}

  viewRedirect(view: string) {
    this.router.navigateByUrl(view);
  }

  getChats(userId: string) {
    this.chatsService.getChats(userId).pipe(
      switchMap(chats => {
        if (chats.length > 0) {
          const profileObservables = chats.map(chat =>
            this.profilesService.getProfile(chat.receiver).pipe(
              map(profile => ({ ...chat, profile })) // Agregar la información del perfil al chat
            )
          );
          return forkJoin(profileObservables);
        } else {
          return of([]);
        }
      })
    ).subscribe((chatsWithProfiles) => {
      console.log(chatsWithProfiles);
      this.chats = chatsWithProfiles;
    });
  }

  newchat() {
    this.uiAlerts.alertaInfo('Función no disponible.');
  }
}
