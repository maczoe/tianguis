import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {};
  @Input() isFavorite = false;
  constructor(
    private router: Router,
    private favProductSvc: FavoriteProductService
  ) {}

  ngOnInit() {}
  selectProduc(productId) {
    this.router.navigateByUrl('/product/' + productId);
  }

  eventFavorite(favorite) {
    if (favorite) {
      this.isFavorite = favorite;
      this.favProductSvc
        .addFavoriteProduct(this.product.id)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.isFavorite = favorite;
      this.favProductSvc
        .removeFavoriteProduct(this.product.id)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
