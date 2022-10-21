import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { Category } from '../model/category';
const urlApi = environment.mockapi;
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http
          .get('./shared/guards/mocks/categories.json')
          .subscribe((resp) => {
            resolve(resp);
          });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
  }

  getCategoryId(categoryId) {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http
          .get('./shared/guards/mocks/categories.json')
          .subscribe((resp: Category[]) => {
            const category = resp.find((c) => c.id === categoryId);

            resolve(category);
          });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
  }
}
