import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-discounted-product-list',
  templateUrl: './discounted-product-list.component.html',
  styleUrls: ['./discounted-product-list.component.scss'],
})
export class DiscountedProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductsService) {
    this.productService.getProductsOffer().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit() {}
}
