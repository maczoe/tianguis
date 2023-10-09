/* eslint-disable quote-props */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Profile } from 'src/app/markteplace/model/profile';

const URL = environment.urlapi + 'auth/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = null;
  respUser = {
    profile: {},
  };
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(user: User): Observable<any> {
    return this.http.post(`${URL}login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${URL}register`, user);
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
        Authorization: `bearer ${this.token}`,
      });
      this.http.get(`${URL}user-token/`, { headers }).subscribe(
        (resp: any) => {
          this.respUser = resp;

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

  logout() {
    this.token = null;
    this.respUser = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  getByEmail(email: string): Observable<any> {
    return this.http.post(`${URL}by-email`, { email });
  }

  authEmail(email: string): Observable<any> {
    return this.http.post(`${URL}auth-login-email`, { email });
  }
}
