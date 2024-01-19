import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Category, ResponseCategories } from '../model/category';
const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api = environment.urlapi + 'categories';
  constructor(private http: HttpClient) {}
  /* getCategories() {
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
  } */

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  getCategoriesList(): Observable<ResponseCategories> {
    return this.http.get<ResponseCategories>(this.api + '/list');
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
