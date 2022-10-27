import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/app');
  }
  googleAuth() {
    this.router.navigateByUrl('/google-sesion');
  }

  facebookAuth() {
    this.router.navigateByUrl('/facebook-sesion');
  }

}
