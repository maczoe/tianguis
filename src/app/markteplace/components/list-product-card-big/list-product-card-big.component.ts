import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-product-card-big',
  templateUrl: './list-product-card-big.component.html',
  styleUrls: ['./list-product-card-big.component.scss'],
})
export class ListProductCardBigComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }

  ngOnInit() {}
}
