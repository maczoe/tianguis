import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { ResponseQuote } from '../model/responseQuote';

const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class QuoteResponsesService {
  private api = environment.urlapi + 'responses-quote';
  constructor(private http: HttpClient) {}

  getQuoteReponsesRequest(id): Observable<ResponseQuote[]> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<ResponseQuote[]>(this.api + '/quote/' + id);
    }
  }

  getQuoteReponseById(id): Observable<ResponseQuote> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<ResponseQuote>(this.api + '/' + id);
    }
  }

  createResponse(response: ResponseQuote): Observable<any> {
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.post(this.api, response);
    }
  }
}
