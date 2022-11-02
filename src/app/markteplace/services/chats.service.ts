import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';

const urlApi =environment.mockapi;
const URL= './shared/guards/mocks/chats-list.json';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  getChats(userId){
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get(URL).subscribe((resp) => {
          resolve(resp);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }
}
