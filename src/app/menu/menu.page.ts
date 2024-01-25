import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { Profile } from '../markteplace/model/profile';
import { PrivacyPolicyPage } from '../modals/privacy-policy/privacy-policy.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user = {
    profile: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      photo: '',
    },
  };
  confirExit = false;
  isAuth = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.isAuth = await this.authService.validateAuth();
    if (!this.isAuth) {
      this.navCtrl.navigateRoot('/app', { animated: true });
    }
    this.user = this.authService.respUser;
  }

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
      this.authService.logout();
    }
  }
}
