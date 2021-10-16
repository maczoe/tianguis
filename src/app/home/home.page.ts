import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';
import { ProfilesService } from '../markteplace/services/profiles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  categories = [];
  products = [];
  productsRecomended = [];
  profiles= [];

  constructor(private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private profilesService: ProfilesService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories().then((data) => {
      this.categories.push(data);

    });

    this.productsService.getProducts().then((data) => {
      this.products.push(data);
    });

    this.productsService.getProductsRecomended().then((data) => {
      this.productsRecomended.push(data);
    });

    this.profilesService.getProfiles().then((data) => {
      this.profiles.push(data);
    });


  }


}
