import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-recommended-product-list',
  templateUrl: './recommended-product-list.component.html',
  styleUrls: ['./recommended-product-list.component.scss'],
})
export class RecommendedProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor( private router: Router) { }

  ngOnInit() { }


  selectProduc(productId) {
    this.router.navigateByUrl('/product/'+productId);
  }

}
