import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, NavController } from '@ionic/angular';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth/services/auth.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntroPage implements OnInit {
  isIntroShowed: boolean;
  slides = [
    {
      title: 'Compra',
      description: 'Compra todo lo que necesitas de forma rápida y segura',
    },
    {
      title: 'Vende',
      description:
        'Con un catálogo de productos más amplio, siempre puede comprar, comparar y mezclar y combinar fácilmente.',
    },
    {
      title: 'Cotiza',
      description:
        'Necesita una solución, producto o servicio. No te compliques, estamos más cerca de lo que crees',
    },
    {
      title: 'Emprende',
      description: 'La clave del éxito es empezar antes de estar listo.',
    },
  ];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}
  async ngOnInit() {
    await this.storage.create();
    await this.cargarStorage();
    if (this.isIntroShowed) {
      this.navCtrl.navigateRoot('/app', { animated: true });
    }
  }

  async cargarStorage() {
    this.isIntroShowed = (await this.storage.get('isIntroShowed')) || false;
  }
  async login() {
    await this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }
  async continue() {
    await this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/preview');
  }

  async register() {
    await this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/register');
  }
}
