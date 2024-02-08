import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { ChatsService } from '../../services/chats.service';
import { Chat } from '../../model/chat';
import { ProfilesService } from '../../services/profiles.service';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Profile } from '../../model/profile';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: Chat[] = [];
  myProfile: Profile = {};

  constructor(
    private router: Router,
    private chatsService: ChatsService,
    private profilesService: ProfilesService,
    private uiAlerts: UiAlertsService,
    private routerPath: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('profile').then((profile) => {
      this.myProfile = JSON.parse(profile);

      if (this.myProfile === null) {
        this.authService.getUserData().then(async (res) => {
          this.myProfile = res.profile;
          await this.getChats(this.myProfile.id.toString());
        });
      } else {
        this.getChats(this.myProfile.id.toString());
      }
    });
  }

  viewRedirect(view: string) {
    this.router.navigateByUrl(view);
  }

  sendMessage(id) {
    this.routerPath.navigateByUrl('/chat-list/' + id);
  }

  getChats(userId: string) {
    this.chatsService
      .getChats(userId)
      .pipe(
        switchMap((chats) => {
          if (chats.length > 0) {
            const profileObservables = chats.map((chat) =>
              this.profilesService
                .getProfile(
                  chat.receiver === this.myProfile.id
                    ? chat.sender
                    : chat.receiver
                )
                .pipe(
                  map((profile) => ({ ...chat, profile })) // Agregar la información del perfil al chat
                )
            );
            return forkJoin(profileObservables);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((chatsWithProfiles) => {

        this.chats = chatsWithProfiles;

        this.chats.forEach((chat) => {
          console.log(chat, chat.messages);
        });
      });
  }

  newchat() {
    this.uiAlerts.alertaInfo('Función no disponible.');
  }
}
