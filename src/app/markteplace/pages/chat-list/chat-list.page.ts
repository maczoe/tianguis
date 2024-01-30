import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';
import { Message } from '../../model/message';
import { ChatsService } from '../../services/chats.service';
import { Chat } from '../../model/chat';
import { Profile } from '../../model/profile';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  @ViewChild('lastMessage', { static: false }) lastMessage: ElementRef;

  chatId = '';
  image: string;
  product: Product = {};
  messages: Message[] = [];
  chat: Chat = {};
  profile: Profile = {};
  receiver: Profile = {};

  currentUser = 'Simon Perez';
  newMessage = '';
  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private chatsService: ChatsService,
    private profileSvc: ProfilesService,
    private storage: Storage
  ) {
    this.chatId = this.router.snapshot.paramMap.get('chat');
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('profile').then((profile) => {
      this.profile = JSON.parse(profile);

      if (this.profile === null) {
        this.authService.getUserData().then((res) => {
          this.profile = res.profile;
          this.getChat(this.chatId);
          this.getMessagesChat(this.chatId);
        });
      } else {
        this.getChat(this.chatId);
        this.getMessagesChat(this.chatId);
      }
    });
  }

  getMessagesChat(idChat) {
    this.chatsService.getMessagesChat(idChat).subscribe((res) => {
      this.messages = res.messages.reverse();
      this.scrollToBottom();
    });
  }

  getChat(idChat) {
    this.chatsService.getChat(idChat).subscribe((res) => {
      this.chat = res;

      if (this.profile.id === this.chat.receiver) {
        this.getReceiver(this.chat.sender);
      } else {
        this.getReceiver(this.chat.receiver);
      }
      this.getProduct(this.chat.product);
    });
  }

  getReceiver(idReceiver) {
    this.profileSvc.getProfile(idReceiver).subscribe((res) => {
      this.receiver = res;
    });
  }

  getProduct(idProduct) {
    this.productsService.getProductId(idProduct).subscribe((data) => {
      this.product = data;
      this.image = this.product.images[0];
    });
  }
  sendMessage() {
    if (this.newMessage !== '') {
      const message = {
        message: this.newMessage,
        sender: this.profile.id,
      };
      this.chatsService.sendMessage(this.chatId, message).subscribe((res) => {
        this.messages.push(res);
        setTimeout(() => this.scrollToBottom(), 0);
      });

      this.newMessage = '';
    }
  }

  scrollToBottom() {
    if (this.lastMessage) {
      this.lastMessage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
