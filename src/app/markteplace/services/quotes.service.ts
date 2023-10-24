import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';

import { Quote } from '../model/quote';
const urlApi = environment.mockapi;
@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private api = environment.urlapi + 'quotes';
  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Quote[]>(this.api);
    }
  }

  getQuoteById(id): Observable<Quote> {
    if (!urlApi) {
      //TODO: make local JSON file requests/*  */
    } else {
      //TODO: make requests to the API server
      return this.http.get<Quote>(this.api + '/' + id);
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
