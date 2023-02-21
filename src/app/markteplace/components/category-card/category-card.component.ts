import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category={
    id: 0,
    name: ''
  };
  constructor( private router: Router) { }

  ngOnInit() {}

  selectCategoryc(categoryId) {
    this.router.navigateByUrl('/products-category/'+categoryId);
  }

}
