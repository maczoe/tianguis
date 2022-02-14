import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.scss'],
})
export class ChatIconComponent implements OnInit {

  @Input()
  newNotifications: number;

  constructor(private router: Router) { }

  ngOnInit() {}

  viewChats() { 
    this.router.navigateByUrl('/chats');
  }


}
