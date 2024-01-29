import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Chat } from '../model/chat';

const urlApi = environment.mockapi;
const URL = './shared/guards/mocks/chats-list.json';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private api = environment.urlapiChat;
  constructor(private http: HttpClient) {}

  getChats(userId): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.api + '/chat/');
  }
}
