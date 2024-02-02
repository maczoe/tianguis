import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.mock';
import { Profile, RegisterProfile } from '../model/profile';

const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private api = environment.urlapi + 'profiles';
  constructor(private http: HttpClient, private authService: AuthService) {}

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

  getProfilesRecomend(): Observable<Profile[]> {
    if (!urlApi) {
      //TODO: make local JSON file requests
      /* this.http.get('./shared/guards/mocks/profiles.json').subscribe((resp: Profile[]) => {
          resolve(resp);
        }); */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Profile[]>(this.api + '/recomend');
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

  registeProfile(profile: RegisterProfile): Observable<any> {
    return this.http.post<Profile>(this.api, profile);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    console.log('Update', profile);

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    return this.http.put<Profile>(this.api, profile, { headers });
  }
}
