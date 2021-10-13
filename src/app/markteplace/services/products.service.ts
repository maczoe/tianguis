import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { Product } from '../model/product';
const urlApi =environment.mockapi;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/products.json').subscribe((resp: Product[]) => {
          resolve(resp.filter(product => product.oldPrice>0));
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getProductsRecomended() {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/products.json').subscribe((resp: Product[]) => {
          resolve(resp.reverse());
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getProductId(idProduct) {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/products.json').subscribe((resp: Product[]) => {
          console.log(idProduct);
          
          const product = resp.find((p) => p.id === idProduct);
          resolve(product);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }
}
