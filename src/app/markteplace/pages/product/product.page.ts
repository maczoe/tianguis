import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { Profile } from '../../model/profile';
import { ProductsService } from '../../services/products.service';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productId = '0';
  product: Product = {};
  profile: Profile = {};

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private profilesService: ProfilesService
  ) {
    this.productId = this.router.snapshot.paramMap.get('idProduct');
    this.getProduct(this.productId);
   }

  ngOnInit() {

  }

  getProduct(idProduct: string ) {

    this.productsService.getProductId(idProduct).then((data) => {
      this.product = data;
      this.getProfile(this.product.profileId);

    });
  }

  getProfile(id) {
    this.profilesService.getProfile(id).then((data) => {
      this.profile = data;
    });
  }

}
