import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.scss'],
})
export class ChatIconComponent implements OnInit {

  @Input()
  newNotifications: number;

  constructor() { }

  ngOnInit() {}

}
