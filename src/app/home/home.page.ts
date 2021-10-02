import { Component, OnInit } from '@angular/core';
import { Category } from '../markteplace/model/category';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  categories = [];
  products= [];

  constructor(private categoriesService: CategoriesService,
              private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories().then((data) => {
      this.categories.push(data);

    });

    this.productsService.getProducts().then((data) => {
      this.products.push(data);
    });

  }


}
