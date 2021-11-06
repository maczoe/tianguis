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

  getQuoteReponses(id) {
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get('./shared/guards/mocks/quotesResponses.json').subscribe((resp: ResponseQuote[]) => {
          
          const responses = resp.filter((r) => r.requests === id);
          console.log(responses);
          resolve(responses);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }
}
