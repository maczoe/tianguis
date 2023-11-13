import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { NotificationsService } from '../core/services/notifications.service';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';
import { ProfilesService } from '../markteplace/services/profiles.service';
import { Storage } from '@ionic/storage-angular';
import { ResponseProducts } from '../markteplace/model/product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories = [];
  products = [];
  productsBig = [];
  isAuth = false;
  showLoginMessage = false;
  productsRecomended = [];
  profiles = [];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private profilesService: ProfilesService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: NotificationsService,
    private authService: AuthService,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.authService.validaToken().then((isAuth) => {
      console.log(isAuth);
    });
    this.initializeApp();
    await this.getData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcmService.initPush();
    });
  }

  async getData() {
    this.categories = [];
    this.products = [];
    this.productsBig = [];
    this.productsRecomended = [];
    this.profiles = [];

    this.categoriesService.getCategories().subscribe((data) => {
      this.categories.push(data);
    });

    this.productsService.getProducts().subscribe((data) => {
      this.productsRecomended.push(data);
    });

    this.profilesService.getProfiles().subscribe((data) => {
      this.profiles.push(data);
    });

    this.productsService
      .getProductsPage()
      .subscribe((data: ResponseProducts) => {
        this.productsBig = data.products;
      });
    return true;
  }

  async refreshCont(event) {
    const done = await this.getData();
    if (done) {
      event.target.complete();
    }
  }

  goLogin() {
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
