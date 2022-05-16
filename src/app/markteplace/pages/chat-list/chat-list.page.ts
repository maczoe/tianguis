import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  messages=[
    {
      user:'Mario Lopez',
      createdAt: new Date('2022-12-2 14:01').getTime(),
      message:' Hola !'
    },
    {
      user:'Mario Lopez',
      createdAt: new Date('2022-12-2 14:05').getTime(),
      message:' Quisiera información de producto.'
    },
    {
      user:'Simon Perez',
      createdAt:  new Date('2022-12-2 14:10').getTime(),
      message:'Un gusto saludarte, claro que si! que es lo que más te interesa del producto.'
    }

  ];

  currentUser='Simon Perez';
  newMessage='';


  sendMessage(){
    this.messages.push({
      user:'Simon Perez',
      createdAt: new Date().getTime(),
      message: this.newMessage,
    });

    this.newMessage='';
  }


  ngOnInit() {
  }

}
