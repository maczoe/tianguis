import { Component, OnInit } from '@angular/core';
import { Category } from '../markteplace/model/category';
import { Product } from '../markteplace/model/product';
import { CategoriesService } from '../markteplace/services/categories.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  categories: Category[] = [];
  categoriesSelect = [];
  product: Product={};
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {
      console.log(data);

      this.categories = data;
      console.log(this.categories);
    });
  }

  handleChange(ev) {
    this.product.categories = ev.target.value;
  }

  onSubmit() {
    console.log(this.product);
  }
}
