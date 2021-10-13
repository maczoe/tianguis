import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-discounted-product-list',
  templateUrl: './discounted-product-list.component.html',
  styleUrls: ['./discounted-product-list.component.scss'],
})
export class DiscountedProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor( private router: Router) { }

  ngOnInit() { }
  
  selectProduc(productId) {
    this.router.navigateByUrl('/product/'+productId);
  }

}
