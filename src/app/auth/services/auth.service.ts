/* eslint-disable quote-props */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

const URL = environment.urlapi + 'auth/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = null;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(user: User): Observable<any> {
    return this.http.post(`${URL}login`, user);
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async validaToken(): Promise<boolean> {
    await this.cargarTokenStorage();
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': `bearer ${this.token}`,
      });
      this.http.get(`${URL}user-token/`, { headers }).subscribe(
        (resp) => {
          console.log(resp);

          resolve(true);
        },
        (err) => {
          this.navCtrl.navigateRoot('/login');

          resolve(false);
        }
      );
    });
  }

  async cargarTokenStorage() {
    this.token = (await this.storage.get('token')) || null;
  }
}
