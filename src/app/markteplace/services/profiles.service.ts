import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Profile } from '../model/profile';

const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private api = environment.urlapi + 'profiles';
  constructor(private http: HttpClient) {}

  getProfiles(): Observable<Profile[]> {
    if (!urlApi) {
      //TODO: make local JSON file requests
      /* this.http.get('./shared/guards/mocks/profiles.json').subscribe((resp: Profile[]) => {
          resolve(resp);
        }); */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Profile[]>(this.api);
    }
  }

  getProfile(id): Observable<Profile> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<Profile>(this.api + '/' + id);
    }
  }
}
