import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: Profile={};

  constructor(private router: Router) { }

  ngOnInit() {}
  eventFavorite(favorite) {
    this.profile.favorite=favorite;
  }

  viewProfile(id) {
    this.router.navigateByUrl('/detail-profile/'+id);
  }
}
