import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { NotificationsService } from '../core/services/notifications.service';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';
import { ProfilesService } from '../markteplace/services/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories = [];
  products = [];
  productsRecomended = [];
  profiles = [];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private profilesService: ProfilesService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: NotificationsService
  ) {}

  ngOnInit() {
    this.initializeApp();
    this.getData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcmService.initPush();
    });
  }

  getData() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories.push(data);
    });

    this.productsService.getProducts().subscribe((data) => {
      this.products.push(data);
    });

    this.productsService.getProducts().subscribe((data) => {
      this.productsRecomended.push(data);
    });

    this.profilesService.getProfiles().subscribe((data) => {
      this.profiles.push(data);
    });
    return true;
  }

  async refreshCont(event) {
    const done = await this.getData();
    if (done) {
      event.target.complete();
    }
  }
}
