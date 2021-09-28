import { Component, OnInit } from '@angular/core';
import { Category } from '../markteplace/model/category';
import { CategoriesService } from '../markteplace/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  categories= [];
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories().then((data) => {
      this.categories.push(data);

    });

  }

}
