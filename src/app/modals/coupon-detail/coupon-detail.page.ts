import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coupon } from 'src/app/markteplace/model/coupon';
import { CouponsService } from 'src/app/markteplace/services/coupons.service';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.page.html',
  styleUrls: ['./coupon-detail.page.scss'],
})
export class CouponDetailPage implements OnInit {
  coupon: Coupon= {};
  id ='';

  constructor(
    private router: ActivatedRoute,
    private couponsService: CouponsService

  ) {
    this.id = this.router.snapshot.paramMap.get('idCoupon');
  }

  ngOnInit() {
    this.couponsService.getCouponById(this.id).then((data) => {
      this.coupon=data;
    });

  }

}
