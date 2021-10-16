import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { Profile } from '../model/profile';

const urlApi =environment.mockapi;

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  getProfiles() {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/profiles.json').subscribe((resp: Profile[]) => {
          resolve(resp);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getProfile(id) {
    return new Promise((resolve) => {
    if (urlApi) {
      //TODO: make local JSON file requests
      this.http.get('./shared/guards/mocks/profiles.json').subscribe((resp: Profile[]) => {
        const profile = resp.find((p) => p.id === id);
          resolve(profile);
      });
    } else {
      //TODO: make requests to the API server
      resolve([]);
    }
  });
 }

}
