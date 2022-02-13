import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../../model/coupon';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss'],
})
export class CouponsListComponent implements OnInit {
  @Input() coupons: Coupon[] = [];
  constructor(private router: Router,) { }

  ngOnInit() { }
  viewCouponByID(id) {
    console.log(id);

  }

}
