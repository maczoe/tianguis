import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { ResponseQuote } from '../model/responseQuote';

const urlApi =environment.mockapi;

@Injectable({
  providedIn: 'root'
})
export class QuoteResponsesService {

  constructor(private http: HttpClient) { }

  getQuoteReponsesRequest(id) {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/quotesResponses.json').subscribe((resp: ResponseQuote[]) => {
          const responses = resp.filter((r) => r.requests === id);
          resolve(responses);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getQuoteReponseById(id) {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/quotesResponses.json').subscribe((resp: ResponseQuote[]) => {
          const response = resp.find((r) => r.id === id);
          resolve(response);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }
    });
  }
}
