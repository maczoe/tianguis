import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from '../../model/product';
import { Profile } from '../../model/profile';
import { ProductsService } from '../../services/products.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productId = '0';
  product: Product = {};
  profile: Profile = {};
  type = 'info';

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private routerPath: Router,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.productId = this.router.snapshot.paramMap.get('idProduct');
  }

  async ngOnInit() {
    await this.storage.create();
    this.getProduct(this.productId);
  }

  getProduct(idProduct: string) {
    this.productsService.getProductId(idProduct).subscribe((data) => {
      this.product = data;
      this.profile = data.profile;
    });
  }

  sendMessage(id) {
    this.routerPath.navigateByUrl('/chat-list/' + id);
  }
  segmentChanged($event) {}
}
