import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
})
export class NotificationIconComponent implements OnInit {

  @Input()
  newNotifications: number;

  constructor() { }

  ngOnInit() {}

}
