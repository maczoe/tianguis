import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-list-product-card-big',
  templateUrl: './list-product-card-big.component.html',
  styleUrls: ['./list-product-card-big.component.scss'],
})
export class ListProductCardBigComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor() {}

  ngOnInit() {}
}
