import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.mock';
import { Product, ResponseProducts } from '../model/product';
const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = environment.urlapi + 'products';
  private reloadSource = new BehaviorSubject(false);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  reload$ = this.reloadSource.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {}

  setReload(value: boolean) {
    this.reloadSource.next(value);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getProductCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + `/category/${id}`);
  }

  getProductsPage(page = 1, pageSize = 5): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(
      this.api + `/list/?page=${page}&pageSize=${pageSize}`
    );
  }

  getProductsRecomm(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/recommended');
  }

  getProductsOffer(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/offer');
  }

  getProductId(idProduct): Observable<Product> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });

    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<Product>(this.api + '/' + idProduct, { headers });
    }
  }

  getProductsProfile(idProfile) {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http
          .get('./shared/guards/mocks/products.json')
          .subscribe((resp: Product[]) => {
            const product = resp.filter((p) => p.profileId === idProfile);
            resolve(product);
          });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
  }

  createProduct(product: Product): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.post(this.api, product, { headers });
    }
  }

  updateProduct(product: Product, id: number): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server

      return this.http.post(this.api + '/update/' + id, product, {
        headers,
      });
    }
  }
}
