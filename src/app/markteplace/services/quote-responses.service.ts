import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { ResponseQuote } from '../model/responseQuote';
import { AuthService } from 'src/app/auth/services/auth.service';

const urlApi = environment.mockapi;

@Injectable({
  providedIn: 'root',
})
export class QuoteResponsesService {
  private api = environment.urlapi + 'responses-quote';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getQuoteReponsesRequest(id): Observable<ResponseQuote[]> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<ResponseQuote[]>(this.api + '/quote/' + id, {
        headers,
      });
    }
  }

  getQuoteReponseById(id): Observable<ResponseQuote> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<ResponseQuote>(this.api + '/' + id, { headers });
    }
  }

  acceptedReponseQuote(id): Observable<ResponseQuote> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.get<ResponseQuote>(this.api + '/acepted/' + id, { headers });
    }
  }

  createResponse(response: ResponseQuote): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    if (!urlApi) {
      //TODO: make local JSON file requests
    } else {
      //TODO: make requests to the API server
      return this.http.post(this.api, response, { headers });
    }
  }
}
