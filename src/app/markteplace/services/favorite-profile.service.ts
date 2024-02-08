import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.mock';
import { FavoriteProfiles } from '../model/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProfileService {
  private api = environment.urlapi + 'favorite-profile';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavoriteProfiles(idProfile: number): Observable<FavoriteProfiles[]> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    return this.http.get<FavoriteProfiles[]>(
      this.api + '/profile/' + idProfile,
      { headers }
    );
  }

  addFavoriteProfile(idProfile): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const data = {
      profileId: idProfile,
    };

    return this.http.post(this.api, data, { headers });
  }

  removeFavoriteProfile(idProfile): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    const data = {
      profileId: idProfile,
    };
    console.log(data);

    return this.http.post(this.api + '/remove', data, { headers });
  }
}
