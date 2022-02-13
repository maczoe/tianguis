import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { Coupon } from '../model/coupon';

const urlApi =environment.mockapi;
const URL= './shared/guards/mocks/coupons.json';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http: HttpClient) { }

  getCoupons() {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get(URL).subscribe((resp: Coupon[]) => {
          resolve(resp);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getCouponById(idCoupon: string) {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get(URL).subscribe((resp: Coupon[]) => {

          const coupon = resp.find((p) => p.id === idCoupon);
          resolve(coupon);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }


}
