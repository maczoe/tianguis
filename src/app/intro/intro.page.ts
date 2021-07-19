import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) { }

  close() {
    //this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

  start() {
    this.router.navigateByUrl('/app');
  }
}
