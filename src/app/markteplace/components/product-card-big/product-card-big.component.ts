import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-card-big',
  templateUrl: './product-card-big.component.html',
  styleUrls: ['./product-card-big.component.scss'],
})
export class ProductCardBigComponent implements OnInit {
  @Input() product: Product;
  constructor(private router: Router) {}

  ngOnInit() {}

  selectProduc(productId) {
    this.router.navigateByUrl('/product/'+productId);
  }
}
