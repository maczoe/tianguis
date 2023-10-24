import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-product-card-big',
  templateUrl: './list-product-card-big.component.html',
  styleUrls: ['./list-product-card-big.component.scss'],
})
export class ListProductCardBigComponent implements OnInit {
  @Input() products: Product[] = [];
  page = 2;
  pageSize = 5;
  constructor(private productsService: ProductsService) {}
  loadProducts() {
    this.productsService
      .getProductsPage(this.page, this.pageSize)
      .subscribe((data) => {
        console.log(data);

        this.products = this.products.concat(data.products);
        this.page++; // Incrementa el número de página para la próxima carga
      });
  }
  loadMore(event) {
    this.loadProducts();
    event.target.complete(); // Marca la carga como completa
  }
  ngOnInit() {}
}
