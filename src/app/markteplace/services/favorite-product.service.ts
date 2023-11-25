import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.mock';
import { FavoriteProducts } from '../model/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductService {
  private api = environment.urlapi + 'favorite-product';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavoriteProducts(idProfile: number): Observable<FavoriteProducts[]> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    return this.http.get<FavoriteProducts[]>(
      this.api + '/profile/' + idProfile,
      { headers }
    );
  }

  addFavoriteProduct(idProducto): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const data = {
      productId: idProducto,
    };
    return this.http.post(this.api, data, { headers });
  }

  removeFavoriteProduct(idProducto): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const data = {
      productId: idProducto,
    };
    return this.http.post(this.api + '/remove', data, { headers });
  }
}
