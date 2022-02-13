import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponsService } from '../markteplace/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: 'coupons.page.html',
  styleUrls: ['coupons.page.scss']
})
export class CouponsPage implements OnInit {
  coupons= [];

  constructor(private router: Router,
    private couponsService: CouponsService
  ) { }

  ngOnInit() {
    this.couponsService.getCoupons().then((coupons) => {
      this.coupons.push(coupons);
      console.log(this.coupons);
    });

  }
  viewCouponByID(id) {
    this.router.navigateByUrl('/coupon-detail/'+id);
  }
}

