import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product={};
  constructor( private router: Router) { }

  ngOnInit() {}
  selectProduc(productId) {
    this.router.navigateByUrl('/product/'+productId);
  }

  eventFavorite(favorite) {
    this.product.favorite=favorite;
  }

}
