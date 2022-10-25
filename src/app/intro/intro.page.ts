import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroPage implements OnInit {
  slides=[
    {
      title: "Compra",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laudantium unde earum tenetur doloremque praesentium quia sequi velit quasi neque, eligendi minus, beatae fuga atque, mollitia repudiandae? Fuga, molestiae necessitatibus!"
    },
    {
      title: "Vende",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laudantium unde earum tenetur doloremque praesentium quia sequi velit quasi neque, eligendi minus, beatae fuga atque, mollitia repudiandae? Fuga, molestiae necessitatibus!"
    },
    {
      title: "Cotiza",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laudantium unde earum tenetur doloremque praesentium quia sequi velit quasi neque, eligendi minus, beatae fuga atque, mollitia repudiandae? Fuga, molestiae necessitatibus!"
    },
    {
      title: "Emprende",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laudantium unde earum tenetur doloremque praesentium quia sequi velit quasi neque, eligendi minus, beatae fuga atque, mollitia repudiandae? Fuga, molestiae necessitatibus!"
    }
    
  ]
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) { }
  ngOnInit() {

  }

  login() {
    //this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
