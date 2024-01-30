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

  getChats(profileId): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.api + '/chat/profile/' + profileId);
  }

  createChat(
    productId = 0,
    profileId = 0,
    quoteId = 0,
    myProfileId = 0,
    type = 'PRODUCT'
  ): Observable<Chat> {
    const data: {
      receiver: number;
      sender: number;
      type: string;
      quote?: number;
      product?: number;
    } = {
      receiver: profileId,
      type,
      sender: myProfileId,
    };

    if (quoteId > 0) {
      data.quote = quoteId;
    }

    if (productId > 0) {
      data.product = productId;
    }
    return this.http.post<Chat>(this.api + '/chat/', data);
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
