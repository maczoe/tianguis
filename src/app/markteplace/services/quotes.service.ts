import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.mock';

import { Quote, QuotesResponse } from '../model/quote';
import { AuthService } from 'src/app/auth/services/auth.service';
const urlApi = environment.mockapi;
@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private api = environment.urlapi + 'quotes';
  private quoteUpdated = new Subject<void>();
  constructor(private http: HttpClient, private authService: AuthService) {}

  public notifyQuoteUpdate() {
    this.quoteUpdated.next();
  }
  public onQuoteUpdate(): Observable<void> {
    return this.quoteUpdated.asObservable();
  }

  getQuotes(): Observable<QuotesResponse> {
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<QuotesResponse>(this.api);
    }
  }

  getMyQuotes(): Observable<QuotesResponse> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
    return this.http.get<QuotesResponse>(this.api+  '/my',{ headers });
    }
  }


  getQuoteById(id): Observable<Quote> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Quote>(this.api + '/' + id,{ headers });
    }
  }
  cancelQuoteById(id): Observable<boolean> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<boolean>(this.api + '/cancel/' + id, { headers });
    }
  }

  getQuoteBgetQuoteByAttachmentyAtt(id): Observable<Quote> {
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Quote>(this.api + '/attachment/' + id);
    }
  }

  createQuote(quote: Quote): Observable<any> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.post(this.api, quote);
    }
  }
}
