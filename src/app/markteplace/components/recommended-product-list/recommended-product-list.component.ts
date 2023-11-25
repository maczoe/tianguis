import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-recommended-product-list',
  templateUrl: './recommended-product-list.component.html',
  styleUrls: ['./recommended-product-list.component.scss'],
})
export class RecommendedProductListComponent implements OnInit {
  @Input() productsFavorite = [];
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductsService) {
    this.productService.getProductsRecomm().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit() {}

  selectProduc(productId) {
    this.router.navigateByUrl('/product/' + productId);
  }

  isProductFavorite(product: Product): boolean {
    return this.productsFavorite.some((favoriteProduct) => favoriteProduct.product.id === product.id);
  }
}
