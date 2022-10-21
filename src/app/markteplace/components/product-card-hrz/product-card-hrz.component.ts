import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-card-hrz',
  templateUrl: './product-card-hrz.component.html',
  styleUrls: ['./product-card-hrz.component.scss'],
})
export class ProductCardHrzComponent implements OnInit {
  @Input() product: Product = {};
  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.product);
  }
  selectProduc(productId) {
    this.router.navigateByUrl('/product/' + productId);
  }

  eventFavorite(favorite) {
    this.product.favorite = favorite;
  }
}
