import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import { Chat, ResponseMessages } from '../model/chat';
import { Message } from '../model/message';

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

  getChat(idChat: string): Observable<Chat> {
    return this.http.get<Chat>(this.api + '/chat/' + idChat);
  }
  sendMessage(idChat, message): Observable<Message> {
    return this.http.post<Message>(this.api + '/message/' + idChat, message);
  }

  getMessagesChat(idChat): Observable<ResponseMessages> {
    return this.http.get<ResponseMessages>(this.api + '/message/' + idChat);
  }
}
