import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';
import { Category } from '../../model/category';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryListComponent implements OnInit {

  @Input() categories: Category[] =[];

  constructor() { }

  ngOnInit() {

  }

}
