import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { Profile } from '../markteplace/model/profile';
import { PrivacyPolicyPage } from '../modals/privacy-policy/privacy-policy.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;
  confirExit = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.user = this.authService.respUser;
  }

  ngOnInit() {}

  viewRedirect(view: string) {
    this.router.navigateByUrl(view);
  }

  async openPrivacyPolicyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage,
      componentProps: {},
    });
    return await modal.present();
  }

  async signOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.confirExit = false;
          },
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.confirExit = true;
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (this.confirExit) {
      console.log('exit');
      this.authService.logout();
    }
  }
}
