import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private api = environment.urlapi + 'categories';
  constructor(private http: HttpClient) {}

  getReviewsProfile(id): Observable<Review[]> {
    return this.http.get<Review[]>(this.api + `profile/${id}`);
  }
}
