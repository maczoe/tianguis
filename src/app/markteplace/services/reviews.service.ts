import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Review, ReviewsPage } from '../model/review';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private api = environment.urlapi + 'reviews';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.validaToken();
  }

  getReviewsProfile(id): Observable<Review[]> {
    return this.http.get<Review[]>(this.api + `/profile/${id}`);
  }
  getReviewsProduct(id): Observable<ReviewsPage> {
    return this.http.get<ReviewsPage>(this.api + `/product/${id}`);
  }


  setReviewsProfile(data): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const response = this.http.post(this.api, data, { headers });
    return response;
  }

  setReviewsProducto(data): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const response = this.http.post(this.api, data, { headers });
    return response;
  }
}
