import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons',
  templateUrl: 'coupons.page.html',
  styleUrls: ['coupons.page.scss']
})
export class CouponsPage {

  constructor(private router: Router) {}

  viewCouponByID(id) {
    this.router.navigateByUrl('/coupon-detail/'+id);
  }
}
