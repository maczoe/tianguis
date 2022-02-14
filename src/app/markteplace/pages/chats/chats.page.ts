import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  viewRedirect(view: string) {
    this.router.navigateByUrl(view);
  }
}
