import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { NotificationsService } from '../core/services/notifications.service';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';
import { ProfilesService } from '../markteplace/services/profiles.service';
import { Storage } from '@ionic/storage-angular';
import { Product, ResponseProducts } from '../markteplace/model/product';
import { FavoriteProductService } from '../markteplace/services/favorite-product.service';
import { FavoriteProfileService } from '../markteplace/services/favorite-profile.service';

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
  user;

  productsFavorite = [];
  profilesFavorite = [];

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
    private favProductSvc: FavoriteProductService,
    private favProfileSvc: FavoriteProfileService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.authService.validaToken().then(async (isAuth) => {
      this.user = await this.authService.getUserData();
      this.initializeApp();
      await this.getData();
    });
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

    this.categoriesService.getCategoriesList().subscribe((data) => {
      this.categories.push(data.categories);
    });

    this.productsService.getProducts().subscribe((data) => {
      this.productsRecomended.push(data);
    });

    this.profilesService.getProfiles().subscribe((data) => {
      this.profiles.push(data);
    });

    this.favProductSvc
      .getFavoriteProducts(this.user.profile.id)
      .subscribe((data) => {
        this.productsFavorite = data;
        this.storage.set(
          'productFavorite',
          JSON.stringify(this.productsFavorite)
        );
      });

    this.favProfileSvc
      .getFavoriteProfiles(this.user.profile.id)
      .subscribe((data) => {
        this.profilesFavorite = data;
        this.storage.set(
          'profileFavorite',
          JSON.stringify(this.profilesFavorite)
        );
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
}
