import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from '../../model/product';
import { Profile } from '../../model/profile';
import { ProductsService } from '../../services/products.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';

import { ReviewModalPage } from 'src/app/modals/review-modal/review-modal.page';
import { ReviewsService } from '../../services/reviews.service';

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
  reviews = [];
  isAuth = false;

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private routerPath: Router,
    private authService: AuthService,
    private reviewSvc: ReviewsService,
    private modalController: ModalController,
    private storage: Storage
  ) {
    this.productId = this.router.snapshot.paramMap.get('idProduct');
  }

  async ngOnInit() {
    await this.storage.create();
    this.getProduct(this.productId);
    this.authService.validateAuth().then((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  getProduct(idProduct: string) {
    this.productsService.getProductId(idProduct).subscribe((data) => {
      this.product = data;
      this.profile = data.profile;
    });
    this.reviewSvc.getReviewsProduct(idProduct).subscribe((res) => {
      this.reviews = res.reviews;
    });
  }

  sendMessage(id) {
    this.routerPath.navigateByUrl('/chat-list/' + id);
  }
  segmentChanged($event) {}

  async openReviewModal(productId: string) {
    const modal = await this.modalController.create({
      component: ReviewModalPage,
      componentProps: {
        productId,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.reviewCreated === true) {
        this.reviewSvc.getReviewsProduct(productId).subscribe((res) => {
          this.reviews = res.reviews;
        });
      } else {
        console.log('Error al agregar reseña');
      }
    });

    return await modal.present();
  }
}
