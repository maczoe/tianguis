import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
})
export class NotificationIconComponent implements OnInit {

  @Input()
  newNotifications: number;

  constructor(private router: Router) { }

  ngOnInit() {}

  viewNotifications() {
    this.router.navigateByUrl('/notifications');
  }

}
