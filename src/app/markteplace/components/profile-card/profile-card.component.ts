import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { FavoriteProfileService } from '../../services/favorite-profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: Profile = {};
  @Input() isFavorite = false;

  constructor(
    private router: Router,
    private favProfileSvc: FavoriteProfileService
  ) {}

  ngOnInit() {}
  eventFavorite(favorite) {
    if (favorite) {
      this.isFavorite = favorite;
      this.favProfileSvc
        .addFavoriteProfile(this.profile.id)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.isFavorite = favorite;
      this.favProfileSvc
        .removeFavoriteProfile(this.profile.id)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  viewProfile(id) {
    this.router.navigateByUrl('/detail-profile/' + id);
  }
}
