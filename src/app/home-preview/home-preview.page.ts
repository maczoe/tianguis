import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';
import { ProfilesService } from '../markteplace/services/profiles.service';
import { ResponseProducts } from '../markteplace/model/product';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home-preview',
  templateUrl: './home-preview.page.html',
  styleUrls: ['./home-preview.page.scss'],
})
export class HomePreviewPage implements OnInit {

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
    private navCtrl: NavController,
    private authSvc: AuthService
  ) { }

 async ngOnInit() {

  this.authSvc.validateAuth().then((isAuth) => {
    console.log(isAuth);
    if(isAuth){
    this.navCtrl.navigateRoot('/app', { animated: true });
    }
  });
    await this.getData();
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
