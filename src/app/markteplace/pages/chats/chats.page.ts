import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { ChatsService } from '../../services/chats.service';
import { Chat } from '../../model/chat';
import { ProfilesService } from '../../services/profiles.service';
import { switchMap, map, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Profile } from '../../model/profile';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { LoadingController } from '@ionic/angular';

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
    private productsService: ProductsService,
    private uiAlerts: UiAlertsService,
    private routerPath: Router,
    private authService: AuthService,
    private storage: Storage,
    private loadingController: LoadingController
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

  async getChats(userId: string) {
    // loader
    const loading = await this.loadingController.create({
      message: 'Cargando chats...',
    });
    await loading.present();

    this.chatsService
      .getChats(userId)
      .pipe(
        switchMap((chats) => {
          if (chats.length > 0) {
            const chatObservables = chats.map((chat) =>
              forkJoin({
                profile: this.profilesService.getProfile(
                  chat.receiver === this.myProfile.id
                    ? chat.sender
                    : chat.receiver
                ),
                product: this.productsService.getProductId(chat.product), // Suponiendo que chat tiene una propiedad productId
              }).pipe(
                map(({ profile, product }) => ({ ...chat, profile, product })) // Agregar la información del perfil y del producto al chat
              )
            );
            return forkJoin(chatObservables);
          } else {
            return of([]);
          }
        }),

        finalize(() => loading.dismiss())
      )
      .subscribe((chatsWithProfilesAndProducts) => {
        this.chats = chatsWithProfilesAndProducts;
        this.chats.forEach((chat) => {
          console.log(chat, chat.messages);
        });
      });
  }

  newchat() {
    this.uiAlerts.alertaInfo('Función no disponible.');
  }
}
