import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../../model/coupon';

@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.scss'],
})
export class CouponCardComponent implements OnInit {
  @Input() coupon: Coupon ={};

  constructor(private router: Router,) { }

  ngOnInit() {}
  viewCouponByID(id: string) {
    this.router.navigateByUrl('/coupon-detail/'+id);

  }
}
