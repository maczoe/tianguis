import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-discounted-product-list',
  templateUrl: './discounted-product-list.component.html',
  styleUrls: ['./discounted-product-list.component.scss'],
})
export class DiscountedProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit() {}

}
