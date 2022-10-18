import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-card-hrz',
  templateUrl: './product-card-hrz.component.html',
  styleUrls: ['./product-card-hrz.component.scss'],
})
export class ProductCardHrzComponent implements OnInit {
  @Input() product: Product = {};
  constructor() {}

  ngOnInit() {
    console.log(this.product);
  }
}
