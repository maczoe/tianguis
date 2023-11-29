import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'app-product-card-hrz',
  templateUrl: './product-card-hrz.component.html',
  styleUrls: ['./product-card-hrz.component.scss'],
})
export class ProductCardHrzComponent implements OnInit {
  @Input() product: Product = {};
  @Input() productsFavorite = [];
  isFavorite = false;
  constructor(
    private router: Router,
    private favProductSvc: FavoriteProductService
  ) {}

  async ngOnInit() {
    await this.isProductFavorite(this.product);
  }
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

  async isProductFavorite(product: Product) {
    this.isFavorite = this.productsFavorite.some(
      (favoriteProduct) => favoriteProduct.product.id === product.id
    );
  }
}
