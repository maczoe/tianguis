import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return new Promise((resolve) => {
      this.http.get('./shared/guards/mocks/categories.json').subscribe((resp) => {
        resolve(resp);
      });
    });
  }
}
