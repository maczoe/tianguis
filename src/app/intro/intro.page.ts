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
    const valid = await this.authService.validaToken();
    if (valid) {
      this.navCtrl.navigateRoot('/app', { animated: true });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  login() {
    //this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
