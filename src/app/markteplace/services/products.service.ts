import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Product } from '../model/product';
const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = environment.urlapi + 'products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!urlApi) {
      //TODO: make local JSON file requests
      /* this.http
        .get('./shared/guards/mocks/products.json')
        .subscribe((resp: Product[]) => {
          resolve(resp.filter((product) => product.oldPrice > 0));
        }); */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Product[]>(this.api);
    }
  }

  getProductsRecomended() {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http
          .get('./shared/guards/mocks/products.json')
          .subscribe((resp: Product[]) => {
            resolve(resp.reverse());
          });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
  }

  getProductId(idProduct): Observable<Product> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<Product>(this.api + '/' + idProduct);
    }
  }

  getProductCategory(categoryId) {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        /* this.http
          .get('./shared/guards/mocks/products.json')
          .subscribe((resp: Product[]) => {
            const products: Product[] = resp;
            let productsCategory: Product[] = [];
            productsCategory = products.filter((p) =>
              p.categories.some((c) => c.id === categoryId)
            );
            resolve(productsCategory);
          }); */
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
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
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.post(this.api, product);
    }
  }
}
