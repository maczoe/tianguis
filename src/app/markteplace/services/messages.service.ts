import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';

import { io } from 'socket.io-client';
import { tap } from 'rxjs/operators';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private api = environment.urlapiChat;
  private socket;
  private currentChatId: string;
  constructor(private http: HttpClient) {
    this.socket = io(this.api, {
      transports: ['websocket'],
      withCredentials: true,
    });
  }

  sendMessage(idChat, message): Observable<Message> {
    const newMessage = this.http
      .post<Message>(this.api + '/message/' + idChat, message)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        tap((message: Message) => {
          this.socket.emit('chatMessage', message);
        })
      );

    return newMessage;
  }

  //WEB SOCKET
  joinChat(chatId: string) {
    this.currentChatId = chatId;
    this.socket.emit('joinChat', chatId);
  }
  receiveNewMessages() {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message: any) => {
        observer.next(message);
      });
    });
  }

  closeConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  rejoinChat() {
    if (this.currentChatId) {
      this.joinChat(this.currentChatId);
    }
  }
}
